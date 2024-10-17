const express = require('express')
const app = express()

app.use(express.urlencoded())

app.use('/', require('./routes'))

app.listen(1008,(err)=>{
    console.log(err ? err : "Server Running on port 1008");
})