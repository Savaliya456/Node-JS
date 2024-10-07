const mongoose = require('mongoose')

const schema = mongoose.Schema({
    productName : {
        type: String,
        // required: true
    },
    price : {
        type: Number,
        // required: true
    },
    star : {
        type : Number,
        // required: true
    },
    rate : {
        type: Number,
        // required: true
    },
    discount : {
        type : Number,
        // required: true
    },
    productImage : {
        type: String,
        // required: true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "SEO Category"
    },
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "SEO Sub-Category"
    }
})

const productsSchema = mongoose.model('SEO Products', schema)

module.exports = productsSchema