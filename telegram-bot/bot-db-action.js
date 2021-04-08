const crypto = require('crypto')
const TelegramUser = require('../models/TelegramUser')
const User = require('../models/WebUser')

class BotActionDB {
    checkUserExist = async (tg_chat_id) => {
        try {
            const userExist = await User.findOne({tg_chat_id})

            if(!userExist) { 
                return 0
            }
            return 1
            
        } catch (e) {
            console.warn('Error: ', e.message)
        }
    }

    saveChatID = async (tg_chat_id) => {
        const userExist = await TelegramUser.findOne({tg_chat_id})

        if(!userExist) {
            const userNew = new TelegramUser ({
                auth_state: '0',
                tg_chat_id,
            })
            await userNew.save()
        }
    }

    checkAuthState = async (tg_chat_id) => {
        const telegramUser = await TelegramUser.findOne({tg_chat_id})
        let message = ``

        switch (telegramUser.auth_state) {
            case '0':
                message = `Введите Ваш логин для`+
                ` продолжения аутентификации.`
                break;
            case '1':
                message = `Введите Ваш пароль для`+
                ` продолжения аутентификации.`
                break;
            case '2':
                message = `Вам нужно ввести секретный`+ 
                ` ключ с сайта.`
                break;   
            default:
                message = `Введите Ваш логин для`+
                 ` продолжения аутентификации.`
                break;
        }
        return `Давайте продолжим!\n` + message 
    }

    getAuthState = async (tg_chat_id) => {
        const telegramUser = await TelegramUser.findOne({tg_chat_id})
        return telegramUser.auth_state || 0
    }

    setAuthState = async (tg_chat_id, stateValue) => {
        await TelegramUser.updateOne({tg_chat_id},{auth_state: stateValue})
    }

    setLogin = async (login, tg_chat_id) => {
        const tgUserExist = await TelegramUser.findOne({tg_chat_id})

        if (tgUserExist) {
            await TelegramUser.updateOne({tg_chat_id},{login})
            return 1
        } 
        return 0
    }

    setPassword = async (password, tg_chat_id) => {
        const tgUserExist = await TelegramUser.findOne({tg_chat_id})
        const hashPassword = crypto.createHmac('sha256', `${tgUserExist.login}`)
        .update(password).digest('hex');

        if (tgUserExist) {
            await TelegramUser.updateOne({tg_chat_id},{password: hashPassword})
            return 1
        } 
        return 0
    }

    setSecretCode = async (secretCode, tg_chat_id) => {
        const tgUserExist = await TelegramUser.findOne({tg_chat_id})

        if (tgUserExist) {
            const hashSecretCode = crypto.createHash('sha256').update(secretCode).digest('base64');
            await TelegramUser.updateOne({tg_chat_id},{web_secret_code: hashSecretCode})
            return 1
        } 
        return 0
    }

    setNewUser = async (login, tg_chat_id, password) => {
        const userNew = new User({login, tg_chat_id, password})
        await userNew.save()
    }
}

module.exports = BotActionDB