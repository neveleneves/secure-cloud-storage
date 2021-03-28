const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WebUsersSchema = new Schema ({
    email: {type: String, required: true, unique: true}, 
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    secret_code: {type: String, required: true}
})

module.exports = mongoose.model('web-users', WebUsersSchema)