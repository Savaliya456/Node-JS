const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/db');
const schema = require('./model/movieSchema');
app.use(express.urlencoded())
app.set('view engine', 'ejs');

app.use('/styles',express.static(path.join(__dirname,'styles')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/', require('./routes'));

app.listen(1008,(err)=>{
    err ? console.error(err) : console.log('Server is running on port 1008');
})