const teacherSchema = require("../model/teacherSchema");
const studentSchema = require("../model/studentSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../middlewares/mailer');
const moment = require('moment');

module.exports.login = async (req, res) => {
  try {
    const teacher = await teacherSchema.findOne({ email: req.body.email });
    if (!teacher) return res.status(200).json({ message: "Invalid Email" });

    const isCompare = await bcrypt.compare(req.body.password, teacher.password);
    if (isCompare) {
      const token = jwt.sign({ teacherData: teacher }, "node");
      res.status(200).json({ msg: "Login Successfully", token, user: teacher });
    } else {
      res.status(200).json({ message: "Wrong Password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Login teacher", error });
  }
};

module.exports.profile = async (req, res) => {
  try {
    const teacher = await teacherSchema.findById(req.user.teacherData._id);
    res.status(200).json({ Profile: teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching teacher data", error });
  } 
};

module.exports.changePassword = async (req, res) => {
  try {
    const teacher = await teacherSchema.findById(req.user.teacherData._id);
    
    if (await bcrypt.compare(req.body.currentPassword, teacher.password)) {
      teacher.password = await bcrypt.hash(req.body.newPassword, 10);
      await teacher.save();
      res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      res.status(401).json({ message: "Invalid Old Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Change Password", error });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const teacher = await teacherSchema.findOne({ email: req.body.email });
    if (!teacher) return res.status(404).json({ message: "Teacher Not Found" });
    
    const otp = Math.floor(5000 + Math.random() * 8000);
    mailer.sendOtp(teacher.email, otp);
    res.cookie('otp', otp);
    res.cookie('teacherID', teacher.id);
    res.status(200).json({ msg: 'OTP Send Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Forgot Password", error });
  }
};

module.exports.otpVerification = async (req, res) => {
  if (req.body.otp === req.cookies.otp) {
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
    const isChange = await teacherSchema.findByIdAndUpdate(req.cookies.teacherID, { password: req.body.newPassword });
    if (isChange) res.status(200).json({ msg: "Password Change Successfully" });
    else res.status(404).json({ msg: "Password Not Modified" });
  } else {
    res.status(401).json({ message: 'Invalid OTP' });
  }
};

module.exports.addStudent = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.createdAt = moment().format('Do MMMM YYYY');
    const student = await studentSchema.create(req.body);
    if (student) {
      res.status(200).json({ msg: "Student Added Successfully", student });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Add Student", error });
  }
};

module.exports.viewStudents = async (req, res) => {
  try {
    const students = await studentSchema.find({ department: req.query.userDepartment });
    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error View Students", error });
  }
};

module.exports.deleteStudent = async (req, res) => {
  try {
    const isDelete = await studentSchema.findByIdAndDelete(req.query.id);
    if (isDelete) res.status(200).json({ msg: "Student Deleted Successfully" });
    else res.status(400).json({ msg: "Student Not Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Delete Student", error });
  }
};

module.exports.editStudent = async (req, res) => {
  try {
    const editUser = await studentSchema.findById(req.query.id);
    req.body.password = editUser.password;
    req.body.createdAt = editUser.createdAt;

    const isEdit = await studentSchema.findByIdAndUpdate(req.query.id, req.body);
    const updateUser = await studentSchema.findById(req.query.id);

    if (isEdit) res.status(200).json({ msg: "Student Edited Successfully", student: updateUser });
    else res.status(400).json({ msg: "Student Not Edited" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Edit Student", error });
  }
};
