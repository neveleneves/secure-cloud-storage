process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const config = require('config')

const BotActionDB = require('./bot-db-action')
const ActionDB = new BotActionDB()

const bot = new TelegramBot(config.get('TelegramBotToken'), { polling: false })

bot.setWebHook(`${config.get('botServerURL')}/bot${config.get('TelegramBotToken')}`)

bot.onText(/\/start/, (msg) => {
    const {chat: {id}} = msg;

    const initMessage = `Здравствуйте, ${msg.from.first_name}!` +
    `\nЯ - Caption Storage Bot, организующий двухфакторную `+
    `аутентификацию в проекте Caption.` +
    `\n\nВведите команду /help, чтобы получить список всeх возможностей`

    bot.sendMessage(id, initMessage)
}) 
bot.onText(/\/register/, (msg) => {
    const {chat: {id}} = msg;

    bot.sendMessage(id, `Начнём регистрацию аккаунта?`, {
        reply_markup: {
            inline_keyboard: [[
                {
                  text: `Да`,
                  callback_data: 'register'
                },
                {
                  text: 'Нет',
                  callback_data: 0
                }
            ]]
        }
    })
})
bot.onText(/\/login/, (msg) => {
    const {chat: {id}} = msg;

    bot.sendMessage(id, `Начнём авторизацию аккаунта?`, {
        reply_markup: {
            inline_keyboard: [[
                {
                  text: `Да`,
                  callback_data: 'login'
                },
                {
                  text: 'Нет',
                  callback_data: 0
                }
            ]]
        }
    })
})
bot.on("polling_error", console.log);

bot.on('callback_query', async (msg) => {
    const {message: {chat: {id}}} = msg;
    
    const isRegistered = await ActionDB.checkUserExist(id)

    if (msg.data === 'register') {
        if(isRegistered) {
            bot.sendMessage(id, 'Я Вас помню, Вы уже регистрировались!')
            bot.sendMessage(id, `${await ActionDB.checkAuthState(id)}`)
        } else {
            await ActionDB.saveChatID(id)
            bot.sendMessage(id, `Введите Ваш логин для начала регистрации`)
        }
    } else if (msg.data === 'login') {
        if(!isRegistered) {
            bot.sendMessage(id, `Вы не регистрировались, введите команду`+ 
            ` /register.`)
        } else {
            bot.sendMessage(id, `${await ActionDB.checkAuthState(id)}`)
        }
    }
    bot.deleteMessage(id, msg.message.message_id);
})
bot.on('message', async (msg) => {
    const {chat: {id}} = msg;
    
    if(msg.text[0] !== '/') {
        const isExist = await ActionDB.checkUserExist(id)
        if(!isExist) {
            bot.sendMessage(id, `Вы не регистрировались, введите команду`+ 
            ` /register.`)
        } else {
            const authState = await ActionDB.getAuthState(id)

            if(authState === '0') {
                const isLoginExist = await ActionDB.checkLogin(msg.text, id)

                if(isLoginExist) {
                    bot.sendMessage(id, 'Шаг выполнен!\n\nТеперь введите пароль!')
                    await ActionDB.setAuthState(id,1)
                } else {
                    bot.sendMessage(id, 'Введён неверный логин, попробуйте снова')
                }
            } else if(authState === '1') {
                const isPasswordExist = await ActionDB.checkPassword(msg.text, id)

                if(isPasswordExist) {
                    bot.sendMessage(id, 'Шаг выполнен!')
                    await ActionDB.setAuthState(id,1)
                } else {
                    bot.sendMessage(id, 'Введён неверный пароль, попробуйте снова')
                }
            } else if(authState === '2') {
                
            } else if(authState === '3') {
                
            }
        }
    } 
    return
})
bot.onText(/\/about/, (msg) => {
    const {chat: {id}} = msg;

    const aboutMessage = `Caption - это безопасное облачное`+
    ` хранилище, которое способно защитить Ваши данные!` +
    `\nДля достижения этой задачи организована двухфакторная `+
     `аутентификация, надёжное шифрование и многое другое.` +
    `\n\nС нами, Вы будете чувствовать себя в безопасности :)`
    bot.sendMessage(id, aboutMessage)
})
bot.onText(/\/help/, async (msg) => {
    const {chat: {id}} = msg;

    try {
        const commands = await bot.getMyCommands()
        let commandsInfo = ``
        for (let command of commands) {
            commandsInfo += `\n/${command.command} - ${command.description}`
        }
        bot.sendMessage(id, commandsInfo)
    } catch (error) {
        bot.sendMessage(id, 'Команды - не найдены')
    }
})

module.exports = bot