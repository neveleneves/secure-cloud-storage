const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

//Current prefix /api/auth

//Route for registration /api/auth/registration 
router.post(
    '/registration',
    [
        check('email', 'Wrong email for registration').isEmail(),
        check('password', 'Wrong password for registration: Minimum password length is 8 symbols')
        .isLength({min:8})
    ]
    , 
    async (req, res) => {
    try {
        //Data validation check
        const validationErrors = validationResult(req)
        
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                error: error.array(),
                message: 'Wrong registration data'
            })
        }

        //Logic for user registration
        const {email, password, login} = req.body 

        const user = await User.findOne({email})
        
        if(user) {
            return res.status(400).json({message: 'This user is already registered'})
        } else {
            const hashPassword = await bcrypt.hash(password, 12);
            const userNew = new User ({email, password: hashPassword, login})

            await userNew.save()
            res.status.apply(201).json({message:'New user has been created'})
        }
    } catch (e) {
        res.status(500).json({message: 'Something wrong with /registration request'})
        console.warn("Something wrong with /registration post-request: ", e.message);
    }
})

//Route for login /api/auth/login 
router.post(
    '/login', 
    [
        check('email', 'Wrong email for login').isEmail(),
        check('password', 'Wrong password for login').exists()
    ],
    async (req, res) => {
    try {
        //Data validation check
        const validationErrors = validationResult(req)
        
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                error: error.array(),
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
    } catch (error) {
        res.status(500).json({message: 'Something wrong with /login request'})
        console.warn("Something wrong with /login post-request: ", e.message);
    }
})

module.exports = router;