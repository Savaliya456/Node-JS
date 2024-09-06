const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Classes1')

const db = mongoose.connection

db.once('open',(err)=>{
    console.log(err ? err : 'MongoDB Connected successfully with Classes1/Movie_crud')
})

module.exports = db