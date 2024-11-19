const express = require('express');
const routes = express.Router();
const controller = require('../controller/teacherCtl');
const { teacherAuth } = require('../middlewares/authantication');

routes.get('/profile', teacherAuth, controller.profile);
routes.get('/viewStudents', teacherAuth, controller.viewStudents);

routes.post('/login', controller.login);
routes.post('/changePassword', teacherAuth, controller.changePassword);
routes.post('/forgotPassword', teacherAuth, controller.forgotPassword);
routes.post('/otpVerification', teacherAuth, controller.otpVerification);
routes.post('/addStudent', teacherAuth, controller.addStudent);

routes.delete('/deleteStudent', teacherAuth, controller.deleteStudent);

routes.put('/editStudent', teacherAuth, controller.editStudent);

module.exports = routes;