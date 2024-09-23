const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    fname : {
        type: String
    },
    lname : {
        type: String, 
    },
    email : {
        type: String,
    },
    password : {
        type : String
    },
    company : {
        type : String
    },
    image : {
        type : String
    }
})

const schema = mongoose.model('Admin Schema', adminSchema);

module.exports = schema;