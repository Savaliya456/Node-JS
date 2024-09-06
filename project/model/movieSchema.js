const mongoose = require('mongoose')

const movie = mongoose.Schema({
    title : {
        type : String,
        // required : true
    },
    director : {
        type : String,
        // required : true
    },
    genre : {
        type : String,
        // required : true
    },
    releaseDate : {
        type : String,
        // required : true
    },
    duration : {
        type:Number,
        // required : true
    },
    rating : {
        type : Number,
        // required : true
    },
    synopsis : {
        type : String,
        // required : true
    },
    poster: {
        type : String,
        // required : true
    },
    coverImg:{
        type : String,
    }
})

const movieSchema = mongoose.model('Movie_Schema',movie)

module.exports = movieSchema
