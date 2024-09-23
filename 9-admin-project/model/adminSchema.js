const mongoose = require('mongoose')
const password = require('password')

const schema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
})

const userSchema = mongoose.model('seoUser', schema)


module.exports = userSchema