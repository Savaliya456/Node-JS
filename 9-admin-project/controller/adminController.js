const userSchema = require('../model/adminSchema')

module.exports.dashboard = (req,res)=>{
    res.render('index')
}

module.exports.alert = (req,res)=>{
    res.render('pages/alerts')
}

module.exports.button = (req,res)=>{
    res.render('pages/buttons')
}

module.exports.card = (req,res)=>{
    res.render('pages/card')
}

module.exports.forms = (req,res)=>{
    res.render('pages/forms')
}

module.exports.typography = (req,res)=>{
    res.render('pages/typography')
}

module.exports.login = (req,res)=>{
    res.render('login')
}

module.exports.register = (req,res)=>{
    res.render('register')
}
module.exports.insertData = async (req,res)=>{
    try {
        const checkData = await userSchema.create(req.body)
        checkData ? res.redirect('/login') : res.redirect('back')
    } catch (error) {
        console.log(error)
    }
}

module.exports.loginUser = (req,res)=>{
    res.redirect('/')
}