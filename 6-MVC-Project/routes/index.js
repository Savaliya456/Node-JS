const express = require('express');
const routes = express.Router();
const admin = require('../controller/admin');
const fs = require('fs');
const multer = require('multer');
const path = require('path');


const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,file.fieldname + '-' + Date.now() );
    }
})

const upload = multer({ storage: Storage }).fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'poster', maxCount: 1 }
]);

routes.get('/',admin.home)
routes.get('/form',admin.form)
routes.post('/addData',upload,admin.addData)
routes.get('/deleteData',admin.deleteData)
routes.get('/editData',admin.editData)
routes.post('/updateData',upload,admin.updateData)
routes.get('/detail',admin.detail)

module.exports = routes;