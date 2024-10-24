// const mongoose = require('mongoose');

// const schema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     department: {
//         type: String,
//         required: true
//     },
//     salary: {
//         type: Number,
//         required: true
//     },
//     role: {
//         type: String,
//         default: 'student'
//     },
//     createdAt: {
//         type: String,
//         required: true
//     }
// });

// const studentSchema = mongoose.model('Students', schema);
// module.exports = studentSchema;


// model/studentSchema.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'student'
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("Student", studentSchema);

