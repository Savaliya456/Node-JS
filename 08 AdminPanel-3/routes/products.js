const express = require('express');
const routes = express.Router()
const controller = require('../controller/products')
const uplodImage = require('../config/multer')

routes.get('/addProducts', controller.addProduct)
routes.get('/viewProducts', controller.viewProducts)
routes.get('/deleteProduct', controller.deleteProduct)
routes.get('/editProduct', controller.editProduct)

routes.post('/addProduct',uplodImage, controller.addProductPost)
routes.post('/updateProduct',uplodImage, controller.updateProduct)

module.exports = routes