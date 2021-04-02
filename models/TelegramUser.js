const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TelegramUsersSchema = new Schema ({ 
    login: {type: String, required: false, unique: true}, 
    password: {type: String, required: false},
    auth_state: {type: String, required: false},
    web_secret_code: {type: String, required: false},
    tg_chat_id: {type: String, required: false, unique: true},
    tg_secret_code: {type: String, required: false},
})

module.exports = mongoose.model('telegram-users', TelegramUsersSchema)