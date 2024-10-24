const express = require('express');
const routes = express.Router();
const controller = require('../controller/principalCtl');
const { principalAuth } = require('../middlewares/authantication');

routes.get('/', principalAuth, controller.Home);
routes.get('/profile', principalAuth, controller.profile);
routes.get('/viewTeachers', principalAuth, controller.viewTeachers);
routes.get('/viewStudents', principalAuth, controller.viewStudents);

routes.post('/add', controller.addPrincipal);
routes.post('/login', controller.login);
routes.post('/changePassword', principalAuth, controller.changePassword);
routes.post('/forgotPassword', controller.forgotPassword);
routes.post('/otpVerification', controller.otpVerification);
routes.post('/addTeacher', principalAuth, controller.addTeacher);
routes.post('/addStudent', principalAuth, controller.addStudent);

routes.delete('/delete', principalAuth, controller.deletePrincipal);
routes.delete('/deleteTeacher', principalAuth, controller.deleteTeacher);
routes.delete('/deleteStudent', principalAuth, controller.deleteStudent);

routes.put('/editTeacher', principalAuth, controller.editTeacher);
routes.put('/editStudent', principalAuth, controller.editStudent);

module.exports = routes;
