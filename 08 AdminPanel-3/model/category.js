const mongoose = require('mongoose')

const schema = mongoose.Schema({
    category : {
        type: String,
        // required: true
    }
})

const categorySchema = mongoose.model('SEO Category', schema)

module.exports = categorySchema