const express = require('express');
const routes = express.Router();
const controller = require('../controller/studentCtl');
const { studentAuth } = require('../middlewares/authantication');

routes.get('/profile', studentAuth, controller.profile);

routes.post('/login', controller.login);
routes.post('/changePassword', studentAuth, controller.changePassword);
routes.post('/forgotPassword', studentAuth, controller.forgotPassword);
routes.post('/otpVerification', studentAuth, controller.otpVerification);

module.exports = routes;
