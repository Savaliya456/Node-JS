const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'employee'
    }
})

const employeeSchema = mongoose.model('Employee', schema)
module.exports = employeeSchema