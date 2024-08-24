const mongoose = require("mongoose");

const crud = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    }
})

const crudTbl = mongoose.model("crud", crud);

module.exports = crudTbl