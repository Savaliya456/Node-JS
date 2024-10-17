const express = require('express');
const routes = express.Router()
const controller = require('../controller/adminCtl')
const { adminAuth} = require('../middlewares/authantication')

routes.get('/',adminAuth, controller.Home)
routes.get('/profile',adminAuth,controller.profile)
routes.get('/viewManagers', adminAuth, controller.viewManagers)
routes.get('/viewEmployee',adminAuth,controller.viewEmployee)

routes.post('/add', controller.addAdmin)
routes.post('/login', controller.login)
routes.post('/changePassword', adminAuth,controller.changePassword)
routes.post('/forgotPassword',adminAuth,controller.forgotPassword)
routes.post('/otpVerification',adminAuth,controller.otpVerification)
routes.post('/addManager', adminAuth,controller.addManager)

routes.delete('/delete', adminAuth,controller.deleteAdmin)
routes.delete('/deleteManager', adminAuth,controller.deleteManager)
routes.delete('/deleteEmployee',adminAuth,controller.deleteEmployee)


module.exports = routes