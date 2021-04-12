const {Router} = require('express')
const randomize = require('randomatic');

const TelegramUser = require('../models/TelegramUser')
const bot = require('../telegram-bot/bot-action')
const BotActionDB = require('../telegram-bot/bot-db-action')
const ActionDB = new BotActionDB()

const router = Router()

//Current prefix /bot(Token)

//Route for bot update process /bot(Token)
router.post(`/`,  (req, res)  => {
    const body = req.body

    bot.processUpdate(body)
    res.sendStatus(200);   
})

//Route for verify reg /bot(Token)/telegram/reg/secret_code/verify
router.post(`/telegram/reg/secret_code/verify`,  async (req, res)  => {
    try {
        const {login, secret_code, password} = req.body

        //Check if the auth session is active
        if(!login || !secret_code || !password) {
            return res.status(504).json({message: 'Время сессии истекло'})  
        }
    
        //Check a user exist into Telegram Bot DB
        const userSuccess = await TelegramUser.findOne({login})
        if(!userSuccess) {
            return res.status(400).json({message: 'Telegram-аккаунт - не зарегистрирован'})
        }
        
        //Compare passwords from WEB and Telegram Bot DB
        if(!ActionDB.checkComparePasswords(password, userSuccess.password)) {
            bot.sendMessage(userSuccess.tg_chat_id, `Значение пароля - не совпадает❌`+
            `\nПопробуйте заново!` + `\n\nВведите Ваш логин для начала регистрации.`)
            await ActionDB.setAuthState(userSuccess.tg_chat_id, 0)

            return res.status(400).json({message: 'Значение пароля - не совпадает'})
        }

        //Compare secret codes from WEB and Telegram Bot DB
        if(!ActionDB.checkCompareSecretCodes(secret_code, userSuccess.web_secret_code)) {
            bot.sendMessage(userSuccess.tg_chat_id, `Значение секретного ключа - не совпадает❌`+
            `\nПопробуйте заново!` + `\n\nВведите Ваш логин для начала регистрации.`)
            await ActionDB.setAuthState(userSuccess.tg_chat_id, 0)

            return res.status(400).json({message: 'Значение секретного ключа - не совпадает'})
        }

        //Compare passwords from WEB and Telegram Bot DB
        await ActionDB.setNewUser(login, userSuccess.tg_chat_id, password)
        //Set a last auth state for success reg
        await ActionDB.setAuthState(userSuccess.tg_chat_id, 4)

        bot.sendMessage(userSuccess.tg_chat_id, `Верификация секретного ключа - пройдена✅`)
    
        return res.status(200).json({message: 'Верификация секретного ключа - пройдена'})
    } catch (e) {
        console.warn("Не удалось верифицировать секретный ключ: ", e.message);
        return res.status(500).json({message: 'Не удалось верифицировать секретный ключ'})
    }
})

//Route for send a secret code into chat /bot(Token)/telegram/login/secret_code/send
router.get(`/telegram/login/secret_code/send`,  async (req, res)  => {
    try {
        const {tg_chat_id} = req.body

        //Check if the auth session is active
        if(!tg_chat_id) {
            return res.status(504).json({message: 'Время сессии истекло'})  
        }
        
        //Check a Telegram user exist in DB
        if(!await ActionDB.checkTgUserExist(tg_chat_id)) {
            return res.status(400).json({message: 'Telegram-аккаунт - не зарегистрирован'})
        }

        //Generate a random secret code for Telegram user and set in DB
        const secret_code = randomize('0', 12)
        await ActionDB.setTelegramSecretCode(secret_code, tg_chat_id)

        //Send a generated secret code in chat
        bot.sendMessage(tg_chat_id, `Запрос на авторизацию✅\n\n`+
        `Ваш секретный ключ:    ${secret_code}`)
 
        return res.status(200).json({message: 'Секретный ключ - сгенерирован'})
    } catch (e) {
        console.warn("Не удалось отправить секретный ключ: ", e.message);
        return res.status(500).json({message: 'Не удалось отправить секретный ключ'})
    }
}) 

//Route for verify login /bot(Token)/telegram/login/secret_code/verify
router.post(`/telegram/login/secret_code/verify`,  async (req, res)  => {
    try {
        const {secret_code, tg_chat_id} = req.body

        //Check if the auth session is active
        if(!secret_code || !tg_chat_id) {
            return res.status(504).json({message: 'Время сессии истекло'})  
        }

        //Check a Telegram user exist in DB and catch data
        const tgUserExist = await TelegramUser.findOne({tg_chat_id})
        if(!tgUserExist) {
            return res.status(400).json({message: 'Telegram-аккаунт - не зарегистрирован'})
        }

        //Compare entered secret code and secret code from DB
        if(!ActionDB.checkCompareSecretCodes(secret_code, tgUserExist.tg_secret_code)) {
            bot.sendMessage(tg_chat_id, `Значение секретного ключа - не совпадает❌`)
            return res.status(400).json({message: 'Значение секретного ключа - не совпадает'})
        }

        bot.sendMessage(tg_chat_id, `Верификация секретного ключа - пройдена✅`)
    
        return res.status(200).json({message: 'Верификация секретного ключа - пройдена'})
    } catch (e) {
        console.warn("Не удалось верифицировать секретный ключ: ", e.message);
        return res.status(500).json({message: 'Не удалось верифицировать секретный ключ'})
    }
}) 
module.exports = router 