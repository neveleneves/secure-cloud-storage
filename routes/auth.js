const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check, validationResult, body} = require('express-validator')
const randomize = require('randomatic');
const crypto = require('crypto')

const User = require('../models/WebUser')
const AssetRequest = require('./redirect-requst')
const Request = new AssetRequest()

const router = Router()

//Current prefix /api/auth

//Route for registration /api/auth/registration 
router.post(
    '/registration',
    [
        check('email', 'Неправильный e-mail адрес').isEmail(),
        check('password', 'Пароль должен содержать не менее 8 символов').isLength({min:8}),
        check('login', 'Логин должен содержать не менее 5 символов').isLength({min:5}),
        body('passwordRepeat').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Пароли не совпадают');
            }
            return true;
        }),
    ], 
    async (req, res) => { 
    try {
        //Data validation check
        const validationErrors = validationResult(req)
        
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.errors,
                message: `${validationErrors.errors[0].msg || `Неизвестная ошибка регистрации`}`
            })
        }

        //Logic for user registration
        const {email, password, login} = req.body 

        const uniqueUser = {
            email: await User.findOne({email}),
            login: await User.findOne({login})
        } 
        
        if (uniqueUser.email || uniqueUser.login) {
            return res.status(400).json({message: 'Этот пользователь уже зарегистрирован'})
        } else {
            const hashPassword = crypto.createHmac('sha256', `${login}`).update(password).digest('hex');
            // Сохранение в cookie-сессии

            // const userNew = new User ({email, login, password: hashPassword, secret_code: 'default'})
            // await userNew.save()

            const userNew = {email, login, password: hashPassword}
            req.session.user = userNew 

            res.status(201).json({message:'Пользователь зарегистрирован'})
        }
    } catch (e) {
        res.status(500).json({message: 'Ошибка при регистрации'})
        console.warn("Ошибка при регистрации: ", e.message);
    }
})

//Route for login /api/auth/login 
router.post(
    '/login', 
    [
        check('email', 'Неверные данные для входа').isEmail(),
        check('password', 'Неверные данные для входа').isLength({min:8}),
        check('login', 'Неверные данные для входа').isLength({min:5}),
        body('passwordRepeat').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Пароли не совпадают');
            }
            return true;
        }),
    ],
    async (req, res) => {
    try {
        //Data validation check
        const validationErrors = validationResult(req)
        
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.errors,
                message: `${validationErrors.errors[0].msg || `Неизвестная ошибка авторизации`}`
            })
        }

        //Logic for user login 
        const {email, password, login} = req.body 

        const uniqueUser = await User.findOne({email});

        if(!uniqueUser) {
            return res.status(400).json({message: 'Пользователь - не найден'})
        } else {
            const comparePassword = await bcrypt.compare(password, uniqueUser.password)
            
            if(!comparePassword) {
                return res.status(400).json({message: 'Данные пользователя - не совпадают'})
            }

            const jsonToken = jwt.sign(
                {
                    userID: uniqueUser.id,
                    userEmail: uniqueUser.email,
                    userLogin: uniqueUser.login,
                    userPassword: uniqueUser.password
                },
                config.get('JWTsecret'),
                {expiresIn: '1h'}
            )
            req.session.user = uniqueUser 
            res.json({jsonToken, userID: uniqueUser.id})
        }
    } catch (e) {
        res.status(500).json({message: 'Ошибка при авторизации'})
        console.warn("Ошибка при авторизации: ", e.message);
    }
})

//Route for request a secret code for Telegram-bot /api/auth/secret_code_request
router.get('/secret_code_request', 
    async (req, res) => {
    try {
        const secret_code = randomize('0', 12)
        const hashSecretCode = crypto.createHash('sha256').update(secret_code).digest('base64');

        if(!req.session.user) {
            res.status(504).json({message: 'Время сессии истекло'})
        }
        req.session.user = {...req.session.user, secret_code: hashSecretCode}

        // const updatedUser = await User.updateOne({_id}, {secret_code: hashSecretCode});
        // if(!updatedUser) {
        //     return res.status(400).json({message: 'Пользователь - не найден'})
        // }

        // Request.botRequest('/auth/web_secret_code/success', 'POST', userSuccess)
        res.status(200).json(secret_code)
    } catch (e) {
        res.status(500).json({message: 'Не удалось сгенирировать секретный ключ'})
        console.warn("Не удалось сгенерировать секретный ключ: ", e.message);
    }
})

//Route for verify a secret code for Telegram-bot /api/auth/secret_code_request
router.get('/verify_secret_code', 
    async (req, res) => {
    try {
        if(!req.session.user) {
            res.status(504).json({message: 'Время сессии истекло'})
        }

        const verifyUser = {
            login: req.session.user.login,
            secret_code: req.session.user.secret_code,
            password: req.session.user.password
        }

        Request.botRequest(res, '/reg/secret_code/verify', 'GET', verifyUser)
    } catch (e) {
        res.status(500).json({message: 'Не удалось подтвердить секретный ключ'})
        console.warn("Не удалось подтвердить секретный ключ: ", e.message);
    }
})
// Logout + cookie clear

module.exports = router;