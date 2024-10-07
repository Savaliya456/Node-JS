const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name : {
        type: String,
        // required: true
    },
    categoryImage : {
        type : String,
    }
})

const categorySchema = mongoose.model('SEO Category', schema)

module.exports = categorySchema