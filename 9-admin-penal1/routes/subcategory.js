const express = require('express');
const routes = express.Router()
const categoryCtl = require('../controller/subcategoryCtl')
const passport = require('passport')

routes.get('/addSubCategory', categoryCtl.addSubCategory)
routes.get('/viewSubCategory', categoryCtl.viewSubCategory)
routes.get('/deleteCategory', categoryCtl.deleteCategory)
routes.get('/editCategory', categoryCtl.editCategory)

routes.post('/addSubCategory', categoryCtl.addSubCategoryPost)
routes.post('/updateCategory', categoryCtl.updateCategory)

module.exports = routes