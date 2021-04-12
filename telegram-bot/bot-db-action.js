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
            console.warn('Check user exist error: ', e.message)
        }
    }

    checkTgUserExist = async (tg_chat_id) => {
        try {
            const tgUserExist = await TelegramUser.findOne({tg_chat_id})

            if(!tgUserExist) { 
                return 0
            }
            return 1
        } catch (e) {
            console.warn('Check tg-user exist error: ', e.message)
        }
    }

    setChatID = async (tg_chat_id) => {
        try {
            const userExist = await TelegramUser.findOne({tg_chat_id})

            if(!userExist) {
                const userNew = new TelegramUser ({
                    auth_state: 0,
                    tg_chat_id,
                })
                await userNew.save()
            }   
        } catch (e) {
            console.warn('Set chat ID error: ', e.message)
        }
    }

    getAuthState = async (tg_chat_id) => {
        try {
            const telegramUser = await TelegramUser.findOne({tg_chat_id})
            return telegramUser.auth_state  
        } catch (e) {
            console.warn('Get auth state error: ', e.message)
        }
    }

    setAuthState = async (tg_chat_id, stateValue) => {
        try {
            await TelegramUser.updateOne({tg_chat_id},{auth_state: stateValue})   
        } catch (e) {
            console.warn('Set auth state error: ', e.message)
        }
    }

    setLogin = async (login, tg_chat_id) => {
        try {
            const tgUserExist = await TelegramUser.findOne({tg_chat_id})

            if (tgUserExist) {
                await TelegramUser.updateOne({tg_chat_id},{login})
                return 1
            } 
            return 0   
        } catch (e) {
            console.warn('Set login error: ', e.message)
        }
    }

    setPassword = async (password, tg_chat_id) => {
        try {
            const tgUserExist = await TelegramUser.findOne({tg_chat_id})
            const hashPassword = crypto.createHmac('sha256', `${tgUserExist.login}`)
            .update(password).digest('hex');

            if (tgUserExist) {
                await TelegramUser.updateOne({tg_chat_id},{password: hashPassword})
                return 1
            } 
            return 0   
        } catch (e) {
            console.warn('Set password error: ', e.message)
        }
    }

    setWebSecretCode = async (secretCode, tg_chat_id) => {
        try {
            const tgUserExist = await TelegramUser.findOne({tg_chat_id})

            if (tgUserExist) {
                const hashSecretCode = crypto.createHash('sha256').update(secretCode).digest('base64')
                await TelegramUser.updateOne({tg_chat_id},{web_secret_code: hashSecretCode})
                return 1
            } 
            return 0   
        } catch (e) {
            console.warn('Set web secret code error: ', e.message)
        }
    }

    setTelegramSecretCode = async (secretCode, tg_chat_id) => {
        try {
            const hashTgSecretCode = crypto.createHash('sha256').update(secretCode).digest('base64')
            await TelegramUser.updateOne({tg_chat_id},{tg_secret_code: hashTgSecretCode})
        } catch (e) {
            console.warn('Set Telegram secret code error: ', e.message)
        }
    }

    setNewUser = async (login, tg_chat_id, password) => {
        try {
            const userNew = new User({login, tg_chat_id, password})
            await userNew.save()   
        } catch (e) {
            console.warn('Set new user error: ', e.message)
        }
    }

    loginHandler = async (login, id) => {
        try {
            const isLoginSet = await this.setLogin(login, id)

            if(isLoginSet) {
                await this.setAuthState(id,1)

                return `Шаг выполнен✅\n\nТеперь введите пароль!`
            } else {
                await this.setAuthState(id,0)

                return `Шаг не выполнен❌\n\n` 
                + `Введён неверный логин, попробуйте заново!` +
                `\nИспользуйте логин с которым вы регистрировались на сайте.` +
                `\n\nВведите Ваш логин для начала регистрации.`
            }   
        } catch (e) {
            console.warn('Login handling error: ', e.message)
        }
    }

    passwordHandler = async (password, id) => {
        try {
            const isPasswordSet = await this.setPassword(password, id)

            if(isPasswordSet) {
                await this.setAuthState(id,2)

                return `Шаг выполнен✅\n\n`
                +`Теперь введите секретный ключ с сайта!`
            } else {
                await this.setAuthState(id,0)

                return `Шаг не выполнен❌\n\n` 
                + `Введён неверный пароль, попробуйте заново!` +
                `\nИспользуйте пароль с которым вы регистрировались на сайте.` +
                `\n\nВведите Ваш логин для начала регистрации.`
            }
        } catch (e) {
            console.warn('Password handling error: ', e.message)
        }
    }

    secretCodeHandler = async (secretCode, id) => {
        try {
            const isSecretCodeSet =  await this.setWebSecretCode(secretCode, id)

            if (isSecretCodeSet) {
                await this.setAuthState(id,3)

                return `Шаг выполнен✅\n\n`
                + `Вернитесь на сайт и подтвердите верификацию ключа!`
            } else {
                await this.setAuthState(id,0)

                return `Шаг не выполнен❌\n\n` 
                + `Введён неверный секретный ключ, попробуйте заново!` +
                `\nИспользуйте секретный ключ сгенерированный на сайте.` +
                `\n\nВведите Ваш логин для начала регистрации.`
            }
        } catch (e) {
            console.warn('Secret code handling error: ', e.message)
        }
    }

    verifyHandler = async (id) => {
        try { 
            await this.setAuthState(id,0)
    
            return `Шаг не выполнен❌\n\n`
            + `Вы не подтвердили секретный ключ на сайте, попробуйте заново!` +
            `\n\nВведите Ваш логин для начала регистрации.`
        } catch (e) {
            console.warn('Verify state error: ', e.message)
        }
    }

    checkCompareSecretCodes = (hashComparable, hashSecretCode) => {
        if(hashComparable === hashSecretCode) {
            return 1
        }
        return 0
    }

    checkComparePasswords = (hashComparable, hashPasswords) => {
        if(hashComparable === hashPasswords) {
            return 1
        }
        return 0
    }
}

module.exports = BotActionDB