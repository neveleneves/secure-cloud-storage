process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const config = require('config')

const bot = new TelegramBot(config.get('TelegramBotToken'), { polling: true })

bot.onText(/\/start/, (msg) => {
    const {chat: {id}} = msg;

    const initMessage = `Здравствуйте, ${msg.from.first_name}!` +
    `\nЯ - Caption Storage Bot, организующий двухфакторную `+
    `аутентификацию в проекте Caption.` +
    `\n\nВведите команду /help, чтобы получить список всеmodeх возможностей`

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

bot.on('callback_query', (msg) => {
    const {message: {chat: {id}}} = msg;

    if (msg.data === 'register') {
        // Засетапить регистрацию
    } else if (msg.data === 'login') {
        // Засетапить авторизацию
    }
    bot.deleteMessage(id, msg.message.message_id);
});

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