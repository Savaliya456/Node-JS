const express = require('express');
const routes = express.Router();
const authantication = require('../middleware/authantication')
const controller = require('../controller/teacherCtl')

routes.get('/viewCourse',authantication, controller.viewCourse);

routes.post('/addCourse',authantication, controller.createCourse)

routes.delete('/deleteCourse',authantication, controller.deleteCourse)

routes.put('/editCourse',authantication, controller.editCourse)

module.exports = routes