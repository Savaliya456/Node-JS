const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'teacher'
    }
});

const teacherSchema = mongoose.model('Teachers', schema);
module.exports = teacherSchema;
