const jwt = require('jsonwebtoken');
const config = require('config')

//Middleware for check a user logged 
module.exports = function checkAuthStatus(req, res, next) {
    const tokenCookie = req.cookies.token

    if(!tokenCookie) {
        return res.status(401).json({message: 'Пользователь не авторизирован'})
    }

    jwt.verify(tokenCookie, config.get('JWTsecret'), (err, user) => {
        if (err) {
            console.log(err)
            return res.redirect('/api/auth/logout')
        }
        
        req.user = user
        next()
    })
};