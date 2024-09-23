const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/Classes1')

const db = mongoose.connection

db.on('open',(err)=>{
    err ? console.log(err) : console.log('mongoDB is connect')
})

module.exports = db