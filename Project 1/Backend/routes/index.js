const express = require('express')
const routes = express.Router();
const authantication = require('../middleware/authantication')

routes.get('/', (req,res)=>{
    console.log('You are in Home page');
})

routes.use('/auth', require('./auth'))
routes.use('/teacher', require('./teacher'));
// routes.use('/student', require('./student'));


module.exports = routes