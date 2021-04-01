const bcrypt = require('bcryptjs')
const TelegramUser = require('../models/TelegramUser')
const User = require('../models/WebUser')

class BotActionDB {
    checkUserExist = async (tg_chat_id) => {
        const telegramUser = await TelegramUser.findOne({tg_chat_id})

        if(!telegramUser) { 
            return 0
        }
        return 1
    }

    saveChatID = async (tg_chat_id) => {
        const userExist = await this.checkUserExist(tg_chat_id)

        if(!userExist) {
            const userNew = new TelegramUser ({
                login: 'default',
                password: 'default',
                auth_state: 0,
                web_secret_code: 'default',
                tg_chat_id,
                tg_secret_code: 'default'
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
            case '3':
                message = `Вам нужно ввести этот`+ 
                ` секретный ключ на сайте.`
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
        return telegramUser.auth_state || '0'
    }

    setAuthState = async (tg_chat_id, stateValue) => {
        await TelegramUser.updateOne({tg_chat_id},{auth_state: stateValue})
    }

    checkLogin = async (login, tg_chat_id) => {
        const webUserExist =  await User.findOne({login})
        const tgUserExist = await TelegramUser.findOne({login})

        if (!webUserExist) {
            return 0
        }
        if (!tgUserExist) {
            await TelegramUser.updateOne({tg_chat_id},{login})
        } 
        return 1
    }

    checkPassword = async (password, tg_chat_id) => {
        const tgUserExist = await TelegramUser.findOne({tg_chat_id})
        const login = tgUserExist.login
        console.log(tgUserExist)

        const webUser = await User.findOne({login})
        const hashPassword = webUser.password
        console.log(webUser)

        if (await bcrypt.compare(password, hashPassword)) {
            return 1
        }
        return 0 
    }
}

module.exports = BotActionDB