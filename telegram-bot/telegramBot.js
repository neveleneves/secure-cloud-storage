const { Telegraf } = require('telegraf') 
const config = require('config')

const bot = new Telegraf(config.get('TelegramBotToken'))
bot.start((ctx) => ctx.reply(`
    Здравствуйте, ${ctx.from.first_name}!` +
    `\nЯ - ${ctx.botInfo.first_name}, органищующий двухфакторную `+
    `аутентификацию в проекте Caption.` +
    `\n\nВведите команду /help, чтобы получить список всех возможностей`
)) 
bot.command('register', (ctx) => {
    ctx.reply(`Давайте начнём!` + `\nВведите Ваш login или e-mail, `+ 
    `для продолжения регистрации.`)
})
bot.command('login', (ctx) => {
    ctx.reply(`Давайте начнём!` + `\nВведите Ваш login или e-mail, `+ 
    `для продолжения авторизации`)
})
bot.command('about', (ctx) => 
    ctx.reply(`Caption - это безопасное облачное хранилище, `+
    `которое способно защитить Ваши данные!` +
    `\nДля достижения этой задачи организована двухфакторная `+
     `аутентификация, надёжное шифрование и многое другое.` +
    `\n\nС нами, Вы будете чувствовать себя в безопасности :)`)
)
bot.help(async (ctx) => {
    try {
        const commands = await bot.telegram.getMyCommands()
        let commandsInfo = ``
        for (let command of commands) {
            commandsInfo += `\n/${command.command} - ${command.description}`
        }
        ctx.reply(commandsInfo)
    } catch (error) {
        ctx.reply('Команды - не найдены')
    }
})
bot.on('text', (ctx) => ctx.reply(`
    ${ctx.from.first_name}, к сожалению, я понимаю только команды!` + 
    `\n\nВведите команду /help, чтобы получить список всех возможностей`
))
bot.on('sticker' || 'photo' || 'document' || 'voice' || 'video' || 'audio', (ctx) => ctx.reply(`
    ${ctx.from.first_name}, к сожалению, я понимаю только команды!` + 
    `\n\nВведите команду /help, чтобы получить список всех возможностей`
))
bot.launch() 