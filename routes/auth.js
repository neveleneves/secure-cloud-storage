const {Router} = require('express')
const {check, validationResult, body} = require('express-validator')
const randomize = require('randomatic');
const crypto = require('crypto')

const User = require('../models/WebUser')
const AssetRequest = require('./redirect-requst');

const Request = new AssetRequest()

const router = Router()

//Current prefix /api/auth

//Route for registration /api/auth/registration 
router.post(
    '/registration/validate',
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

        //Find a user into DB by login
        const uniqueUser = await User.findOne({login})

        //Check if data is new
        if (uniqueUser) {
            return res.status(400).json({message: 'Этот пользователь уже зарегистрирован'})
        } else {
            //Hashing a password
            const hashPassword = crypto.createHmac('sha256', `${login}`).update(password).digest('hex');
            crypto.com

            //Formation of data for saving in cookie session
            const userNew = {email, login, password: hashPassword}
            req.session.user = userNew 

            res.status(200).json({message:'Данные введены верно'})
        }
    } catch (e) {
        res.status(500).json({message: 'Ошибка при регистрации'})
        console.warn("Ошибка при регистрации: ", e.message);
    }
})

//Route for login /api/auth/login 
router.post(
    '/login/validate', 
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

        //Getting data from a form on the site
        const {email, password, login} = req.body 

        //Find a user into DB by login
        const uniqueUser = await User.findOne({login});

        //Check if a user exists in the DB
        if(!uniqueUser) {
            return res.status(400).json({message: 'Пользователь - не зарегистрирован'})
        } else {
            //Hashing a password
            const hashPassword = crypto.createHmac('sha256', `${login}`)
            .update(password).digest('hex')

            //Compare a passwords from DB and form
            if(hashPassword !== uniqueUser.password) {
                return res.status(400).json({message: 'Данные пользователя - не совпадают'})
            }

            //Save data in cookie session
            const userLogin = {
                login,
                password: uniqueUser.password,
                tg_chat_id: uniqueUser.tg_chat_id,
                user_id: uniqueUser._id,
            }

            req.session.user =  userLogin

            res.status(200).json({message:'Данные введены верно'})
        }
    } catch (e) {
        res.status(500).json({message: 'Ошибка при авторизации'})
        console.warn("Ошибка при авторизации: ", e.message);
    }
})

//Route for generate a secret code for Telegram-bot /api/auth/reg/secret_code/generate
router.get('/reg/secret_code/generate', 
    async (req, res) => {
    try {
        //Check if the auth session is active
        if(!req.session.user) {
            res.status(504).json({message: 'Время сессии истекло'})
            return
        }

        //Getting a random secret code for WEB and hashing code 
        const secret_code = randomize('0', 12)
        const hashSecretCode = crypto.createHash('sha256').update(secret_code).digest('base64');

        //Updating a data session
        req.session.user = {...req.session.user, secret_code: hashSecretCode}

        res.status(200).json(secret_code)
    } catch (e) {
        res.status(500).json({message: 'Не удалось сгенирировать секретный ключ'})
        console.warn("Не удалось сгенерировать секретный ключ: ", e.message);
    }
})

//Route for verify a secret code for Telegram-bot /api/auth/reg/secret_code/verify
router.get('/reg/secret_code/verify', 
    async (req, res) => {
    try {
        //Check if the auth session is active
        if(!req.session.user) {
            res.status(504).json({message: 'Время сессии истекло'})
            return
        }

        //Formation of data for sending to bot-server
        const verifyUser = {
            login: req.session.user.login,
            secret_code: req.session.user.secret_code,
            password: req.session.user.password
        }

        //Sending a data to bot-server for verify reg
        Request.botRequest(res, '/telegram/reg/secret_code/verify', 'POST', verifyUser)
    } catch (e) {
        res.status(500).json({message: 'Не удалось подтвердить секретный ключ'})
        console.warn("Не удалось подтвердить секретный ключ: ", e.message);
    }
})

//Route for send a secret code into Telegram /api/auth/login/secret_code/request
router.get('/login/secret_code/request', 
    async (req, res) => {
    try {
        //Check if the auth session is active
        if(!req.session.user) {
            res.status(504).json({message: 'Время сессии истекло'})
            return
        }
        
        //Get a user data by login and catch user chat id 
        const telegramUser = {
            tg_chat_id: req.session.user.tg_chat_id
        }

        //Sending a data to bot-server for request a secret code
        Request.botRequest(res, '/telegram/login/secret_code/send', 'GET', telegramUser)
    } catch (e) {
        res.status(500).json({message: 'Не удалось запросить секретный ключ'})
        console.warn("Не удалось запросить секретный ключ: ", e.message);
    }
})

//Route for verify a secret code from Telegram /api/auth/secret_code/request
router.post(
    '/login/secret_code/verify',
    [
        check('secret_code', 'Неверный секретный ключ').isLength({min:12})
    ],
    async (req, res) => {
    try {
        //Check if the auth session is active
        if(!req.session.user) {
            res.status(504).json({message: 'Время сессии истекло'})
            return
        }

        //Data validation check
        const validationErrors = validationResult(req)
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.errors,
                message: `${validationErrors.errors[0].msg || `Неизвестная ошибка верификации`}`
            })
        }

        const {secret_code} = req.body

        //Get a user data by login and formation of data for sending to bot-server
        const telegramUser = {
            tg_chat_id: req.session.user.tg_chat_id,
            user_id: req.session.user.user_id,
            secret_code: crypto.createHash('sha256').update(secret_code).digest('base64')
        }

        Request.botRequest(res, '/telegram/login/secret_code/verify', 'POST', telegramUser)
    } catch (e) {
        res.status(500).json({message: 'Не удалось подтвердить секретный ключ'})
        console.warn("Не удалось подтвердить секретный ключ: ", e.message);
    }
})
module.exports = router;