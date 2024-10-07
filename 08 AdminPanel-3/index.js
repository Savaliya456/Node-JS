const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/db')
const passport = require('passport');
const session = require('express-session')
const passportSt = require('./config/passport')
const flash = require('connect-flash')
const connectFlash = require('./config/flashConnect')

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use('/',express.static(path.join(__dirname,"public")))
app.use('/uploads/products', express.static(path.join(__dirname, "uploads/products")))
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
app.use(passport.authUser)
app.use(flash())
app.use(connectFlash.flashData)

app.use('/', require('./routes'))
app.use('/category',passport.checkAuthantication, require('./routes/category'))
app.use('/subcategory',passport.checkAuthantication, require('./routes/subcategory'))
app.use('/products',passport.checkAuthantication, require('./routes/products'))

app.listen(1008, (err)=>{
    console.log(err ? err : "Server running on port 1008");
})