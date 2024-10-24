const principalSchema = require("../model/principalSchema");
const teacherSchema = require("../model/teacherSchema");
const studentSchema = require("../model/studentSchema");
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../middlewares/mailer');

module.exports.Home = async (req, res) => {
  try {
    const principalData = await principalSchema.find({});
    res.status(200).json({ msg: "Principals", data: principalData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching principal data", error });
  }
};

module.exports.addPrincipal = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const add = await principalSchema.create(req.body);
    res.status(200).json({ msg: "Principal Added Successfully", data: add });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Adding Principal Data", error });
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await principalSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ message: "Invalid Email" });
    }
    const isCompare = await bcrypt.compare(req.body.password, user.password);
    if (isCompare) {
      const token = jwt.sign({ userData: user }, 'node');
      return res.status(200).json({ msg: "Login Successfully", token, user });
    }
    res.status(200).json({ message: "Wrong Password!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Logging in Principal" });
  }
};

module.exports.profile = async (req, res) => {
  try {
    const user = await principalSchema.findById(req.user.userData._id);
    res.status(200).json({ Profile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching principal data", error });
  }
};

module.exports.deletePrincipal = async (req, res) => {
  try {
    const isDelete = await principalSchema.findByIdAndDelete(req.query.id);
    if (isDelete) res.status(200).json({ msg: "Principal Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Deleting Principal Data", error });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const principal = await principalSchema.findById(req.user.userData._id);
    
    if (await bcrypt.compare(req.body.currentPassword, principal.password)) {
      principal.password = await bcrypt.hash(req.body.newPassword, 10);
      await principal.save();
      res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      res.status(401).json({ message: "Invalid Old Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Changing Password", error });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const principal = await principalSchema.findOne({ email: req.body.email });
    if (!principal) return res.status(404).json({ message: "Principal Not Found" });
    const otp = Math.floor(5000 + Math.random() * 8000);
    mailer.sendOtp(principal.email, otp);
    res.cookie('otp', otp);
    res.cookie('principalID', principal.id);
    res.status(200).json({ msg: 'OTP Sent Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error in Forgot Password", error });
  }
};

module.exports.otpVerification = async (req, res) => {
  if (req.body.otp == req.cookies.otp) {
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
    const isChange = await principalSchema.findByIdAndUpdate(req.cookies.principalID, { password: req.body.newPassword });
    if (isChange) res.status(200).json({ msg: "Password Changed Successfully" });
    else res.status(404).json({ msg: "Password Not Modified" });
  } else {
    res.status(401).json({ message: 'Invalid OTP' });
  }
};

module.exports.addTeacher = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.createdAt = moment().format('Do MMMM YYYY');
    
    const teacher = await teacherSchema.create(req.body);
    if (teacher) {
      res.status(200).json({ msg: "Teacher Added Successfully", teacher });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Adding Teacher", error });
  }
};

module.exports.viewTeachers = async (req, res) => {
  try {
    const teachers = await teacherSchema.find({});
    res.status(200).json({ teachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Viewing Teachers", error });
  }
};

module.exports.deleteTeacher = async (req, res) => {
  try {
    const isDelete = await teacherSchema.findByIdAndDelete(req.query.id);
    if (isDelete) res.status(200).json({ msg: "Teacher Deleted Successfully" });
    else res.status(400).json({ msg: "Teacher Not Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Deleting Teacher", error });
  }
};

module.exports.editTeacher = async (req, res) => {
  try {
    const editUser = await teacherSchema.findById(req.query.id);
    req.body.password = editUser.password;
    req.body.createdAt = editUser.createdAt;
    const isEdit = await teacherSchema.findByIdAndUpdate(req.query.id, req.body);
    const updateUser = await teacherSchema.findById(req.query.id);

    if (isEdit) res.status(200).json({ msg: "Teacher Edited Successfully", teacher: updateUser });
    else res.status(400).json({ msg: "Teacher Not Edited" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Editing Teacher", error });
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
    res.status(500).json({ msg: "Error Adding Student", error });
  }
};

module.exports.viewStudents = async (req, res) => {
  try {
    const students = await studentSchema.find({});
    if (!students) return res.status(404).json({ msg: "Students Not Found" });
    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Viewing Students", error });
  }
};

module.exports.deleteStudent = async (req, res) => {
  try {
    const isDelete = await studentSchema.findByIdAndDelete(req.query.id);
    if (isDelete) res.status(200).json({ msg: "Student Deleted Successfully" });
    else res.status(400).json({ msg: "Student Not Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Deleting Student", error });
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
    res.status(500).json({ msg: "Error Editing Student", error });
  }
};
