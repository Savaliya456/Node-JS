const express = require('express');
const routes = express.Router()
const categoryCtl = require('../controller/categoryCtl')
const passport = require('passport')
const uplodImage = require('../config/multer')


routes.get('/addCategory', categoryCtl.addCategory)
routes.get('/viewCategory', categoryCtl.viewCategory)
routes.get('/deleteCategory', categoryCtl.deleteCategory)
routes.get('/editCategory', categoryCtl.editCategory)

routes.post('/addCategory', categoryCtl.addCategoryPost)
routes.post('/updateCategory', categoryCtl.updateCategory)


module.exports = routes