const {Router} = require('express')
const config = require('config')

const TelegramUser = require('../models/TelegramUser')
const bot = require('../telegram-bot/bot-action')
const BotActionDB = require('../telegram-bot/bot-db-action')
const ActionDB = new BotActionDB()

const router = Router()

//Current prefix / 

router.post(`/`,  (req, res)  => {
    const body = req.body

    bot.processUpdate(body)
    res.sendStatus(200);
})

router.post(`/auth/web_secret_code/success`,  async (req, res)  => {
    try {
        const {login} = req.body
        if(!login) {
            res.status(504).json({message: 'Время сессии истекло'})
        }
    
        const userSuccess = await TelegramUser.findOne({login})
        bot.sendMessage(userSuccess.tg_chat_id, `Верификация секретного ключа - пройдена✅`)
        ActionDB.setAuthState(userSuccess.tg_chat_id,4)

        res.sendStatus(200).json({message: 'Верификация секретного ключа - пройдена'})
    } catch (e) {
        res.status(500).json({message: 'Не удалось верифицировать секретный ключ'})
        console.warn("Не удалось верифицировать секретный ключ: ", e.message);
    }
})
module.exports = router 