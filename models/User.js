const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema ({
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    login: {type: String, required: true, unique: true}
})

module.exports = mongoose.model('users', UsersSchema)