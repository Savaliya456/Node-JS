const adminSchema = require('../model/adminSchema')
const fs = require('fs')

module.exports.login = (req, res)=>{
    res.render('login')
}
module.exports.loginAdmin = async (req, res)=>{
    const user = await adminSchema.findOne({email : req.body.email})
    console.log(user)
    if(!user){
        return res.redirect('/')
    }
    if(user.password == req.body.password){
        res.cookie("admin", user)
        res.redirect('/dashboard')
    } 
    else {
        res.redirect('back')
    }
}
module.exports.dashboard = (req,res)=>{
    res.render('dashboard')
}
module.exports.addadmin = (req,res)=>{
    res.render('addadmin')
}
module.exports.adddata = (req,res)=>{
    if(req.file){
        req.body.image = req.file.path
    }
    const dataadd = adminSchema.create(req.body)
    dataadd ? res.redirect('/viewadmin') : console.log('Data Not Add')
}
module.exports.deleteAdmin = async (req, res)=>{
    const data = await adminSchema.findById(req.query.id)
    if(data.image){
        fs.unlinkSync(data.image)
        console.log('image remove')
    }
    const isdelete = await adminSchema.findByIdAndDelete(req.query.id)
    isdelete ? res.redirect('/viewadmin') : console.log('Error While Delete Admin')
}
module.exports.editAdmin = async (req, res)=>{
    const data = await adminSchema.findById(req.query.id)
    data ? res.render('editadmin', {data}) : console.log('Error')
}
module.exports.updataAdmin = async (req, res)=>{
    const data = await adminSchema.findById(req.query.id)
    const image = data.image
    if(req.body.file){
        fs.unlinkSync(data.image)
        image = req.file.path
    }
    req.body.image = image
    const UpdataData = await adminSchema.findByIdAndUpdate(req.query.id, req.body)
    UpdataData ? res.redirect('/viewadmin') : console.log('Error in updating')
}
module.exports.viewadmin = async (req,res)=>{
    const data =await adminSchema.find({})
    res.render('viewadmin', {data})
}