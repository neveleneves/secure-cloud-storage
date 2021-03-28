const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check, validationResult, body} = require('express-validator')
const randomize = require('randomatic');

const User = require('../models/WebUser')
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
            const hashPassword = await bcrypt.hash(password, 12);
            const userNew = new User ({email, login, password: hashPassword, secret_code: 'default'})

            await userNew.save()
        
            req.session.userID = userNew.id
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
        console.log(req.body)
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
            req.session.userID = userNew.id
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
        const secretCode = randomize('0', 12)

        const _id = req.session.userID
        if(!_id) {
            res.status(504).json({message: 'Время сессии истекло'})
        }

        const activeUser = await User.findOneAndUpdate({_id}, {secret_code: secretCode});
        

        res.status(200).json(secretCode)
    } catch (e) {
        res.status(500).json({message: 'Не удалось сгенирировать секретный ключ'})
        console.warn("Не удалось сгенерировать секретный ключ: ", e.message);
    }
})
//Route for verify a secret code for Telegram-bot /api/auth/secret_code_request
//In process?????????????????????????????????
router.post('/secret_code_request', 
    async (req, res) => {
    try {
        if(!req.body) {
            return res.status(400).json({message: 'Секретный ключ не был отправлен'})
        }
        const secretCode = req.body
        
        const uniqueUser = await User.findOne({secretCode})
        if(!uniqueUser) {
            return res.status(400).json({message: 'Пользователь с таким ключом - не найден'})
        } else {
            uniqueUser.telegramVerify = true;
            res.json({tgVerify: uniqueUser.telegramVerify, userID: uniqueUser.id})
        }
    } catch (e) {
        res.status(500).json({message: 'Не удалось подтвердить секретный ключ'})
        console.warn("Не удалось подтвердить секретный ключ: ", e.message);
    }
})

// Logout + cookie clear

module.exports = router;