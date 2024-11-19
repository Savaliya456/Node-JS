const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {
        type : String,
        // required : true
    },
    subject : {
        type : String,
        // required : true
    },
    category : {
        type : String,
        // required : true
    },
    duration : {
        type : String,
        // required : true
    },
    posterImage : {
        type : String,
        // required : true
    },
    rating : {
        type : Number,
        // required : true
    },
    assignment : { 
        type : String,
        // required : true
    },
    teacherId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        // required : true
    }
})

const userSchema = mongoose.model('course', schema)

module.exports = userSchema