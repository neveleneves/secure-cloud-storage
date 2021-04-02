const {Router} = require('express')
const config = require('config')
// const bcrypt = require('bcryptjs')
// const randomize = require('randomatic');

const bot = require('../telegram-bot/bot-action')

const router = Router()

//Current prefix / 

router.post(`/bot${config.get('TelegramBotToken')}`,  (req, res)  => {
    const body = req.body
    bot.processUpdate(body)
    res.sendStatus(200);
})

router.post(`/test`,  (req, res)  => {
    console.log("123123123123")
})

module.exports = router 