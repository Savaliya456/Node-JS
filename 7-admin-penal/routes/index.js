const express = require('express')
const routes = express.Router()
const controller = require('../controller/adminController')
const auth = require('../middleware/auth')
const multer = require('multer')
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
routes.post('/login', controller.loginAdmin)
routes.get('/dashboard',auth, controller.dashboard)
routes.get('/addadmin',auth, controller.addadmin)
routes.post('/adddata',auth,uploadpic, controller.adddata)
routes.get('/viewadmin',auth, controller.viewadmin)
routes.get('/deleteadmin',auth, controller.deleteAdmin)
routes.get('/editadmin',auth, controller.editAdmin)
routes.post('/updateadmin',auth, controller.updataAdmin)


module.exports = routes