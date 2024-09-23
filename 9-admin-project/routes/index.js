const express = require('express')
const routes = express.Router()
const controller = require('../controller/adminController')
const passport = require('passport')

routes.get('/', controller.dashboard)
routes.get('/alerts',passport.checkAuthantication,controller.alert)
routes.get('/buttons',passport.checkAuthantication, controller.button)
routes.get('/card',passport.checkAuthantication, controller.card)
routes.get('/forms',passport.checkAuthantication, controller.forms)
routes.get('/typography',passport.checkAuthantication, controller.typography)
routes.get('/login', controller.login)
routes.get('/register', controller.register)


routes.post('/insertData', controller.insertData)
routes.post('/login',passport.authenticate("local", {failureRedirect : "/login"}) ,controller.loginUser)

module.exports = routes;