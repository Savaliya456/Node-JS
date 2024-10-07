const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name : {
        type: String,
        // required: true
    },
    email : {
        type: String,
        // required: true,
        unique: true
    },
    password : {
        type: String,
        // required: true
    },
    age : {
        type : Number,
        // required: true
    },
    mobile : {
        type : Number,
        // required: true
    }
})

const userSchema = mongoose.model('SEO Users', schema)

module.exports = userSchema