const express = require('express')
const session = require('express-session');
const cookieParser = require("cookie-parser");
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use(cookieParser());

app.use(session({
    name: 'sid',
    secret: config.get('sessionKey'),
    resave: false,
    saveUninitialized: false,
    cookie: { 
        // secure: true,   for prod
        secure: false,
        sameSite: 'strict',
        httpOnly: true,
        maxAge: 1000 * 60 * 15
    }
}))

//Route for authentication
app.use('/api/auth', require('./routes/auth'))

//Route for user state
app.use('/api/user', require('./routes/user'))

//Route for actions in storage
app.use('/api/storage', require('./routes/storage'))

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