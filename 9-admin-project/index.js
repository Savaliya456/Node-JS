const express = require('express')
const app = express()
const path = require('path')
const db = require('./config/db')
const passport = require('passport')
const session = require('express-session')
const passportSt = require('./config/passport')

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use('/',express.static(path.join(__dirname,"public")))

app.use(
    session({
      name: "Users",
      secret: "keyboard",
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 1 }
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'))

app.listen(1008, (err)=>{
    err ? console.log(err) : console.log('start in port number 1008')
}) 