const express = require('express');
const path = require('path')
const app = express();

// const mongoose = require('mongoose')

// mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err))

// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => console.log('Server on port 3000'))