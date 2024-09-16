const express = require('express')
const app = express()
const path = require('path')
const db = require('./config/db')
const cookie = require('cookie-parser')

app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.use('/',express.static(path.join(__dirname,'public')))
app.use(cookie())
app.use('/uploads', express.static(path.join(__dirname,'uploads')))

app.use('/', require('./routes'))

app.listen(3000,(err)=>{
    err ? console.log(err) : console.log('server start in port 3000')
})    