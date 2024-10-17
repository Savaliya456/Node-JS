const express = require('express');
const app = express();
const db = require('./config/db')
const cookie = require('cookie-parser');

app.use(express.urlencoded())
app.use(cookie())

app.use('/', require('./routes'))

app.listen(1008,(err)=>{
    console.log(err? err : "Server is running on port 1008");
})