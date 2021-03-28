const config = require('config')
const mongoose = require('mongoose')
const express = require('express')
require('./bot-action') 

const app = express()
app.use(express.json({extended: true}))

//Set the bot port value
const PORT =  config.get('botPort') || 5555

//Function for connect to database (MongoDB)
async function databaseConnect() {
    mongoose.connect(config.get('mongoURI'), {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    })
}

//Function to start the bot
async function initBot() {
    try {
        await databaseConnect();
        app.listen(PORT, () => console.log(`Bot launched on port ${PORT}...`))
    } catch (e) {
        console.warn("Something wrong with bot: ", e.message)
    }
}
initBot()