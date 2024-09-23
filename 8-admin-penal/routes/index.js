const express = require('express')
const routes = express.Router()
const controller = require('../controller/adminController')
const multer = require('multer')
const passport = require('passport')
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})
const uploadpic = multer({storage:storage}).single('image')


routes.get('/', controller.login)
routes.post('/login', passport.authenticate("local", {failureRedirect : '/'}), controller.loginAdmin)
routes.get('/dashboard', passport.checkAuth, controller.dashboard)
routes.get('/addadmin',passport.checkAuth,  controller.addadmin)
routes.post('/adddata',passport.checkAuth, uploadpic, controller.adddata)
routes.get('/viewadmin',passport.checkAuth,  controller.viewadmin)
routes.get('/deleteadmin',passport.checkAuth,  controller.deleteAdmin)
routes.get('/editadmin',passport.checkAuth,  controller.editAdmin)
routes.post('/updateadmin',passport.checkAuth,  controller.updataAdmin)


module.exports = routes