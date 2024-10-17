const managerSchema = require("../model/managerSchema");
const employeeSchema = require("../model/employeeSchema");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailer = require('../middlewares/mailer')


module.exports.login = async (req, res) => {
  try {
    const manager = await managerSchema.findOne({ email: req.body.email });
    if (!manager) return res.status(401).json({ message: "Invalid Email" });

    const isCompare = await bcrypt.compare(req.body.password, manager.password);
    if (isCompare) {
      const token = jwt.sign({ managerData: manager }, "node");
      res.status(200).json({ msg: "Login Successfully", token });
    } else{
        res.status(200).json({ mesage: "Wrong Password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Login admin", error });
  }
};

module.exports.profile = async (req, res) => {
  try {
    const manager = await managerSchema.findById(req.user.managerData._id)
    res.status(200).json({Profile: manager});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching admin data", error });
  } 
}

module.exports.changePassword = async (req, res) => {
  try {
    const manager = await managerSchema.findById(req.user.managerData._id)
    if(await bcrypt.compare(req.body.oldPassword,manager.password)){
      manager.password = await bcrypt.hash(req.body.newPassword,10)
      await manager.save()
      res.status(200).json({message : "Password Changed Successfully"})
    }else{
      res.status(401).json({message : "Invalid Old Password"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Change Password", error });
  }
}

module.exports.forgotPassword = async (req,res)=>{
  try {
    const manager = await managerSchema.findOne({email: req.body.email})
    if(!manager) return res.status(404).json({message : "Manager Not Found"})
    const otp = Math.floor(5000 + Math.random() * 8000)
    mailer.sendOtp(manager.email,otp)
    res.cookie('otp',otp)
    res.cookie('adminID',manager.id)
    res.status(200).json({msg : 'OTP Send Successfully'})
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Forgot Password", error });
  }
}

module.exports.otpVerification = async (req,res)=>{
  if(req.body.otp === req.cookies.otp){
    console.log(otpCanform)
    // req.body.newPassword = await bcrypt.hash(req.body.newPassword,10)
    // const isChange = await managerSchema.findByIdAndUpdate(req.cookies.adminID,{password : req.body.newPassword})
    // if(isChange) res.status(200).json({msg : "Password Change Successfully"})
    //   else res.status(404).json({msg : "Password Not Modified"})
  }else{
    res.status(401).json({message : 'Invalid OTP'})
  }
}

module.exports.addEmployee = async (req,res)=>{
  try {
    req.body.password = await bcrypt.hash(req.body.password,10)
    const employee = await employeeSchema.create(req.body)
    if(employee){
      res.status(200).json({msg : "Manager Add Successfully", employee})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Add Employee", error });
  }
}

module.exports.viewEmployee = async (req, res)=>{
  try {
    const employee = await employeeSchema.find({})
    res.status(200).json({employee})
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error View Employee", error });
  }
}

module.exports.deleteEmployee = async (req,res)=>{
  try {
    const isDelete = await employeeSchema.findByIdAndDelete(req.query.id)
    if(isDelete) res.status(200).json({msg : "Employee Delete Successfully"})
      else res.status(400).json({msg : "Employee Not Deleted"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Delete Employee", error });
  }
}