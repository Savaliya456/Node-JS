const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/secondCrud')

const db = mongoose.connection;

db.on('open',(err)=>{
    console.log(err ? err : 'Connected to MongoDB Database')
})