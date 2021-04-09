const {Router} = require('express')
const randomize = require('randomatic');

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

router.get(`/reg/secret_code/verify`,  async (req, res)  => {
    try {
        const {login, secret_code, password} = req.body

        if(!login || !secret_code || !password) {
            return res.status(504).json({message: 'Время сессии истекло'})  
        }
    
        const userSuccess = await TelegramUser.findOne({login})
        if(!userSuccess) {
            return res.status(400).json({message: 'Telegram-аккаунт - не зарегистрирован'})
        }

        if(userSuccess.web_secret_code !== secret_code) {
            bot.sendMessage(userSuccess.tg_chat_id, `Значение секретного ключа - не совпадает❌`)
            return res.status(400).json({message: 'Значение секретного ключа - не совпадает'})
        }

        if(userSuccess.password !== password) {
            bot.sendMessage(userSuccess.tg_chat_id, `Значение пароля - не совпадает❌`)
            return res.status(400).json({message: 'Значение пароля - не совпадает'})
        }

        await ActionDB.setNewUser(login, userSuccess.tg_chat_id, password)
        await ActionDB.setAuthState(userSuccess.tg_chat_id, 4)

        bot.sendMessage(userSuccess.tg_chat_id, `Верификация секретного ключа - пройдена✅`)
    
        return res.status(200).json({message: 'Верификация секретного ключа - пройдена'})
    } catch (e) {
        console.warn("Не удалось верифицировать секретный ключ: ", e.message);
        return res.status(500).json({message: 'Не удалось верифицировать секретный ключ'})
    }
})

router.get(`/auth/secret_code/generate`,  async (req, res)  => {
    try {
        const {tg_chat_id} = req.body

        const tgUserExist = await TelegramUser.findOne({tg_chat_id})
        if(!tgUserExist) {
            return res.status(400).json({message: 'Telegram-аккаунт - не зарегистрирован'})
        }

        const secret_code = randomize('0', 12)
        bot.sendMessage(tg_chat_id, `Ваш секретный ключ для авторизации: ${secret_code}`)
 
        return res.status(200).json({message: 'Секретный ключ - сгенерирован'})
    } catch (e) {
        console.warn("Не удалось сгенерировать секретный ключ: ", e.message);
        return res.status(500).json({message: 'Не удалось сгенерировать секретный ключ'})
    }
}) 
module.exports = router 