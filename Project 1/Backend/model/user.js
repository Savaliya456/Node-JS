const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {
        type : String,
        // required : true
    },
    email : {
        type : String,
        unique : true
        // required : true
    },
    contact : {
        type : Number,
        // required : true
    },
    age : {
        type : Number,
        // required : true
    },
    role : {
        type : String,
        // required : true
        enum : ['teacher', 'student'],
        default : 'student'
    },
    password : {
        type : String,
        // required : true
    },
})

const userSchema = mongoose.model('user', schema)

module.exports = userSchema