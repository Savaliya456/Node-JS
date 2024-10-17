const userSchema = require('../model/userSchema')

module.exports.home = async (req,res)=>{
    const data = await userSchema.find({})
    res.json({message : "You are in Home Page", data})
}

module.exports.insertData = async (req,res)=>{
    const data = await userSchema.create(req.body)
    res.json({message : "Data Inserted Successfully", data : data})
}

module.exports.deleteData = async (req,res)=>{
    const isDelete = await userSchema.findByIdAndDelete(req.query.id)
    res.json({message : "Data Deleted Successfully"})
}

module.exports.updateData = async (req,res)=>{
    const isEdit = await userSchema.findByIdAndUpdate(req.query.id,  req.body)
    res.json({message : "Data Edited Successfully"})
}