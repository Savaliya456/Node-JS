const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Classes1')

const db = mongoose.connection;

db.on('open', (err) => {
    err ? console.error(err) : console.log('Connected to MongoDB Database');
});