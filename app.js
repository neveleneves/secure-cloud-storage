const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
var session = require('express-session');

const app = express()
app.use(express.json({extended: true}))

app.use(session({
    name: 'sid',
    secret: config.get('sessionKey'),
    resave: false,
    saveUninitialized: false,
    cookie: { 
        // secure: true,   for prod
        secure: false,
        sameSite: true,
        maxAge: 10000 * 60 * 15
      }
}))

//Route authentication
app.use('/api/auth', require('./routes/auth'))
// app.use('/bot', require('./routes/bot-auth')) 

//Set the server port value
const PORT = config.get('port') || 5000

//Function for connect to database (MongoDB)
async function databaseConnect() {
    mongoose.connect(config.get('mongoURI'), {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    })
}

//Function to start the app
async function initServer() {
    try {
        await databaseConnect();
        app.listen(PORT, () => console.log(`App launched on port ${PORT}...`))
    } catch (e) {
        console.warn("Something wrong with server: ", e.message)
    }
}
initServer()