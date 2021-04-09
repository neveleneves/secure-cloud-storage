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

// bot.onText(/\/login/, (msg) => {
//     const {chat: {id}} = msg;

//     bot.sendMessage(id, `Начнём авторизацию аккаунта?`, {
//         reply_markup: {
//             inline_keyboard: [[
//                 {
//                   text: `Да`,
//                   callback_data: 'login'
//                 },
//                 {
//                   text: 'Нет',
//                   callback_data: 0
//                 }
//             ]]
//         }
//     })
// })
bot.on("polling_error", console.log);

bot.on('callback_query', async (msg) => {
    const {message: {chat: {id}}} = msg;
    
    const isRegistered = await ActionDB.checkUserExist(id)

    if (msg.data === 'register') {
        if(isRegistered) {
            bot.sendMessage(id, `Пользователь с такими данными уже зарегистрирован`)
        } else {
            await ActionDB.setChatID(id)
            bot.sendMessage(id, `Введите Ваш логин для начала регистрации`)
        }
    } else if (msg.data === 'login') {
        if(!isRegistered) {
            bot.sendMessage(id, `Вы не регистрировались, введите команду`+ 
            ` /register.`)
        } else {
            await ActionDB.setAuthType(id, 'login')
            await ActionDB.setAuthState(id, 0)
            bot.sendMessage(id, `Введите Ваш логин для начала авторизации`)
        }
    }
    bot.deleteMessage(id, msg.message.message_id);
})

bot.on('message', async (msg) => {
    const {chat: {id}} = msg;
    
    if(msg.text[0] === '/') {
        return
    }

    const isExist = await ActionDB.checkTgUserExist(id)
    if (!isExist) {
        bot.sendMessage(id, `Вы не регистрировались, введите команду`+ 
        ` /register.`)
        return
    }

    const authState = await ActionDB.getAuthState(id)

    switch (authState) {
        case 0:
            bot.sendMessage(id, await ActionDB.loginHandler(msg.text, id))
            break;
        case 1:
            bot.sendMessage(id, await ActionDB.passwordHandler(msg.text, id))
            break;
        case 2:
            bot.sendMessage(id, await ActionDB.secretCodeHandler(msg.text, id))
            break;
        case 3:
            bot.sendMessage(id, await ActionDB.verifyHandler(id))
            break;
        case 4:
            bot.sendMessage(id, await ActionDB.authSuccessHandler(id))
        default:
            break;
    }
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