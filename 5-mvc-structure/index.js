const express = require('express');
const port = 3000;
const app = express();
const path = require('path');

app.use(express.urlencoded());
app.set("view engine" , "ejs");
app.use('/Image', express.static(path.join(__dirname, 'Image')));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/', require('./routes'))

app.listen(port ,(err)=>{
    err ? console.log(err) : console.log("Server Start")
})