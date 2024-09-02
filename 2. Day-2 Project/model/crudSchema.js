const mongoose = require("mongoose");

const crud = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    year : {
        type : Number,
        required : true
    },
    pages : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    copies : {
        type : Number,
        required : true
    },
    image: {
        type : String,
        required : true
    }
})

const crudTbl = mongoose.model("crud", crud);

module.exports = crudTbl