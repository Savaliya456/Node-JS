const adminSchema = require("../model/adminSchema");
const managerSchema = require("../model/managerSchema");
const employeeSchema = require("../model/employeeSchema");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailer = require('../middlewares/mailer')


module.exports.Home = async (req, res) => {
  try {
    const adminData = await adminSchema.find({});    
    res.status(200).json({ msg: "Admins", data: adminData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching admin data", error });
  }
};

module.exports.addAdmin = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password,10)
    const add = await adminSchema.create(req.body);
    res.status(200).json({ msg: "Admin Add Successfully", data: add });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Add admin data", error });
  }
};

module.exports.login = async (req,res) =>{
  try {
    const user = await adminSchema.findOne({email : req.body.email})
    if(!user) return res.status(401).json({message : "Invalid Email"})

    const isCompare = await bcrypt.compare(req.body.password,user.password)
    if(isCompare){
      const token = jwt.sign({ userData: user }, 'node');
      res.status(200).json({msg : "Login Successfully",token})
    }
    res.status(200).json({mesage : "Wrong Password!"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Login admin", error });
  }
}

module.exports.profile = async (req, res) => {
  try {
    const user = await adminSchema.findById(req.user.userData._id)
    res.status(200).json({Profile: user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching admin data", error });
  } 
}

module.exports.deleteAdmin = async (req, res) => {
  try {
    const isDelete = await adminSchema.findByIdAndDelete(req.query.id);
    if (isDelete) res.status(200).json({ msg: "Admin Delete Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Delete admin data", error });
  }
};

module.exports.changePassword = async (req,res)=>{
  try {
    const admin = await adminSchema.findById(req.user.userData._id)
    
    if(await bcrypt.compare(req.body.oldPassword,admin.password)){
      admin.password = await bcrypt.hash(req.body.newPassword,10)
      await admin.save()
      res.status(200).json({message : "Password Changed Successfully"})
    }
    else{
      res.status(401).json({message : "Invalid Old Password"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Change Password", error });
  }
}

module.exports.forgotPassword = async (req,res)=>{
  try {
    const admin = await adminSchema.findOne({email: req.body.email})
    if(!admin) return res.status(404).json({message : "Admin Not Found"})
    const otp = Math.floor(5000 + Math.random() * 8000)
    mailer.sendOtp(admin.email,otp)
    res.cookie('otp',otp)
    res.cookie('adminID',admin.id)
    res.status(200).json({msg : 'OTP Send Successfully'})
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Forgot Password", error });
  }
}

module.exports.otpVerification = async (req,res)=>{
  if(req.body.otp === req.cookies.otp){
    req.body.newPassword = await bcrypt.hash(req.body.newPassword,10)
    const isChange = await adminSchema.findByIdAndUpdate(req.cookies.adminID,{password : req.body.newPassword})
    if(isChange) res.status(200).json({msg : "Password Change Successfully"})
      else res.status(404).json({msg : "Password Not Modified"})
  }else{
    res.status(401).json({message : 'Invalid OTP'})
  }
}

module.exports.addManager = async (req,res)=>{
  try {
    req.body.password = await bcrypt.hash(req.body.password,10)
    const manager = await managerSchema.create(req.body)
    if(manager){
      res.status(200).json({msg : "Manager Add Successfully", manager})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Add Manger", error });
  }
}

module.exports.viewManagers =  async (req,res)=>{
  try {
    const managers = await managerSchema.find({})
    res.status(200).json({managers})
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error View Mangers", error });
  }
}

module.exports.deleteManager = async (req,res)=>{
  try {
    const isDelete = await managerSchema.findByIdAndDelete(req.query.id)
    if(isDelete) res.status(200).json({msg : "Manager Delete Successfully"})
      else res.status(400).json({msg : "Manager Not Deleted"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Delete Manger", error });
  }
}

module.exports.viewEmployee = async (req, res)=>{
  try {
    const employee = await employeeSchema.find({})
    if(!employee) return res.status(404).json({msg : "Employee Not Found"})
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