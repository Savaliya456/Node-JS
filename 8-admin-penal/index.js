const express = require('express')
const app = express()
const path = require('path')
const db = require('./config/db')
const passport = require('passport')
const session = require('express-session')
const localst = require('./config/passport')

app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.use(session({
    name: 'demo',
    secret: 'keyboard',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge : 1000 * 60 * 10 }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authUserData)

app.use('/',express.static(path.join(__dirname,'public')))

app.use('/uploads', express.static(path.join(__dirname,'uploads')))

app.use('/', require('./routes'))

app.listen(3000,(err)=>{
    err ? console.log(err) : console.log('server start in port 3000')
})   