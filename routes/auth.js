const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check, validationResult, body} = require('express-validator')
const User = require('../models/User')
const router = Router()

//Current prefix /api/auth

//Route for registration /api/auth/registration 
router.post(
    '/registration',
    [
        check('email', 'Неправильный e-mail адрес').isEmail(),
        check('password', 'Пароль должен содержать не менее 8 символов')
        .isLength({min:8}),
        check('login', 'Логин должен содержать не менее 5 символов')
        .isLength({min:5}),
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
                message: `${validationErrors.errors[0].msg || `Неверные данные для регистрации`}`
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
            const userNew = new User ({email, password: hashPassword, login})

            await userNew.save()
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
        check('email', 'Wrong email for login').isEmail(),
        check('password', 'Wrong password for login').exists(),
        check('login', 'Wrong login-name for login: Minimum login length is 5 symbols')
        .isLength({min:5}),
        body('passwordRepeat').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password mismatch');
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
                message: 'Wrong login data'
            })
        }

        //Logic for user login 
        const {email, password, login} = req.body 

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: 'User not found'})
        } else {
            const comparePassword = await bcrypt.compare(password, user.password)
            
            if(!comparePassword) {
                return res.status(400).json({message: 'Wrong login data'})
            }

            const jsonToken = jwt.sign(
                {
                    userID: user.id,
                    userEmail: user.email,
                    userLogin: user.login,
                    userPassword: user.password
                },
                config.get('JWTsecret'),
                {expiresIn: '1h'}
            )
            res.json({jsonToken, userID: user.id})
        }
    } catch (e) {
        res.status(500).json({message: 'Something wrong with /login request'})
        console.warn("Something wrong with /login post-request: ", e.message);
    }
})

module.exports = router;