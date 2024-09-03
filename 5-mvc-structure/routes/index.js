const express = require('express')
const routes = express.Router()
const admin = require('../controller/adminctl')


routes.get('/', admin.home)
routes.get('/about', admin.about)
routes.get('/skills', admin.skills)
routes.get('/contact', admin.contact)
routes.get('/book', admin.book)

module.exports = routes