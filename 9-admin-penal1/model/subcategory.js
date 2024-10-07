const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name : {
        type: String,
        // required: true
    },
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SEO Category',
    }
})

const subcategorySchema = mongoose.model('SEO Sub-Category', schema)

module.exports = subcategorySchema