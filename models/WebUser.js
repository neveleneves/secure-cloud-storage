const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WebUsersSchema = new Schema ({
    email: {type: String, required: false, unique: true}, 
    login: {type: String, required: true, unique: true},
    password: {type: String, required: false},
    tg_chat_id: {type: String, required: true}
})

module.exports = mongoose.model('web-users', WebUsersSchema)