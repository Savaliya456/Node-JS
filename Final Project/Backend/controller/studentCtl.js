const studentSchema = require("../model/studentSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middlewares/mailer");

module.exports.login = async (req, res) => {
  try {
    const student = await studentSchema.findOne({ email: req.body.email });
    if (!student) return res.status(401).json({ message: "Invalid Email" });

    const isCompare = await bcrypt.compare(req.body.password, student.password);
    if (isCompare) {
      const token = jwt.sign({ studentData: student }, "node");
      res.status(200).json({ msg: "Login Successfully", token, user: student });
    } else {
      res.status(200).json({ message: "Wrong Password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Login student", error });
  }
};

module.exports.profile = async (req, res) => {
  try {
    const student = await studentSchema.findById(req.user.studentData._id);
    res.status(200).json({ Profile: student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching student data", error });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const student = await studentSchema.findById(req.user.studentData._id);
    if (await bcrypt.compare(req.body.oldPassword, student.password)) {
      student.password = await bcrypt.hash(req.body.newPassword, 10);
      await student.save();
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
    const student = await studentSchema.findOne({ email: req.body.email });
    if (!student) return res.status(404).json({ message: "Student Not Found" });
    
    const otp = Math.floor(5000 + Math.random() * 8000);
    mailer.sendOtp(student.email, otp);
    res.cookie("otp", otp);
    res.cookie("studentID", student.id);
    res.status(200).json({ msg: "OTP Sent Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Forgot Password", error });
  }
};

module.exports.otpVerification = async (req, res) => {
  if (req.body.otp === req.cookies.otp) {
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
    const isChange = await studentSchema.findByIdAndUpdate(
      req.cookies.studentID,
      { password: req.body.newPassword }
    );
    if (isChange) res.status(200).json({ msg: "Password Changed Successfully" });
    else res.status(404).json({ msg: "Password Not Modified" });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
};
