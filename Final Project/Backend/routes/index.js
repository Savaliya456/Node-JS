const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: "You Are In Home Page" });
});

routes.use('/principal', require('./principal'));
routes.use('/teacher', require('./teacher'));
routes.use('/student', require('./student'));

module.exports = routes;
