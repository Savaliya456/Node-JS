const express = require('express');
const routes = express.Router()
const controller = require('../controller/admin')

routes.get('/', controller.home);

routes.post('/insertData', controller.insertData);

routes.delete("/deleteData", controller.deleteData);

routes.put('/updateData', controller.updateData);

module.exports = routes