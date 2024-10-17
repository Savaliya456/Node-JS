const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    mobile : {
        type : Number,
    }
})

const userSchema = mongoose.model("Project1", schema)

module.exports = userSchema;