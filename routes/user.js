const {Router} = require('express')

const checkAuthStatus = require('../middleware/checkAuthStatus');

const router = Router()

//Current prefix /api/user

//Route for check a user auth status /api/user/check
router.get('/check', checkAuthStatus, async (req, res) => {
    try {
        const jsonToken = req.cookies.token
        const userSuccessID = req.user.userLoginSuccess

        const userConfirm = {
            jsonToken,
            userSuccessID
        }
        return res.status(200).json({...userConfirm})
    } catch (e) {
        res.status(500).json({message: 'Не удалось проверить авторизацию пользователя'})
        console.warn("Не удалось проверить авторизацию пользователя: ", e.message);
    }
})

//Route for logout user /api/user/logout
router.post('/logout', async (req, res) => {
    try {
        if(req.session) {
            req.session.destroy()
        }

        res.clearCookie('token')
        res.clearCookie('sid')

        res.cookie('token', {}, {maxAge: -1})
        res.cookie('sid', {}, {maxAge: -1})

        res.status(200).json({message: 'Сессия завершена'})
    } catch (e) {
        res.status(500).json({message: 'Не удалось выйти из аккаунта'})
        console.warn("Не удалось выйти из аккаунта: ", e.message);
    }
})

module.exports = router 