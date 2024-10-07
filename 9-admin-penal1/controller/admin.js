const userSchema = require("../model/user");
const mailer = require('../config/mailer')

module.exports.dashboard = (req, res) => {
  res.render("index");
};

module.exports.login = (req, res) => {
  res.render("login");
};

module.exports.loginUser = async (req, res) => {
  const user = await userSchema.findOne({ email: req.body.email });
  if (!user) {
    return res.redirect("/");
  }
  if(user.password == req.body.password){
    req.flash("success", "Login successfully")
    res.redirect("/")
  }   
  else{
    res.redirect("back");
  }
};

module.exports.register = (req, res) => {
  res.render("register");
};

module.exports.singup = async (req, res) => {
  try {
    const isSignup = await userSchema.create(req.body);
    isSignup ? res.redirect("/") : res.redirect("back");
  } catch (err) {
    console.error(err);
  }
};

module.exports.alerts = (req, res) => {
  res.render("pages/alerts");
};
module.exports.buttons = (req, res) => {
  res.render("pages/buttons");
};
module.exports.card = (req, res) => {
  res.render("pages/card");
};
module.exports.forms = (req, res) => {
  res.render("pages/forms");
};
module.exports.typography = (req, res) => {
  res.render("pages/typography");
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Handle error if any occurs during logout
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err); // Handle error during session destruction
      }
      res.redirect("/"); // Redirect to login or another page after logout
    });
  });
};

module.exports.viewUsers = async (req, res) => {
  try {
    const data = await userSchema.find({});
    res.render("pages/viewUsers", { data });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const isDelete = await userSchema.findByIdAndDelete(req.query.id);
    isDelete ? res.redirect("/viewUsers") : console.log("Data Not Deleted");
  } catch (err) {
    console.log(err);
  }
};

module.exports.editUser = async (req, res) => {
  try {
    const data = await userSchema.findById(req.query.id);
    data
      ? res.render("pages/editUser", { data })
      : console.log("Data Not Found");
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const data = await userSchema.findById(req.query.id);
    req.body.password = data.password;

    const isUpdate = await userSchema.findByIdAndUpdate(req.query.id, req.body);
    isUpdate ? res.redirect("/viewUsers") : console.log("Data Not Update");
  } catch (error) {
    console.log(error);
  }
};

module.exports.myProfile = async (req, res) => {
  try {
    res.render("pages/profile");
  } catch (error) {
    console.log(error);
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    res.render("pages/changePassword");
  } catch (error) {
    console.log(error);
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const user = await userSchema.findById(req.user.id);

    if (user.password == req.body.oldPassword) {
      user.password = req.body.newPassword;
      const isUpdate = await user.save();
      if (isUpdate) {
        return res.redirect("/logOut");
      } else {
        console.log("Password Not Update");
        return res.redirect("/changePassword");
      }
    } else {
      console.log("Current Password is incorrect");
      return res.redirect("/changePassword");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.forgetPasswordOpen = (req,res)=>{
  res.render('pages/forgetPassword')
}

module.exports.forgetPasswordCheck = async (req,res)=>{
  const user = await userSchema.findOne({email: req.body.email})
  if(user){
    const otp = Math.floor(1000 + Math.random() * 9000);
    mailer.sendOtp(user.email, otp);
    req.session.otp = otp,
    req.session.adminId = user.id
    const msg = "OTP sent successfully"
    res.render('pages/otp', {msg: msg})
  } else{
    req.flash("error", "Email unvalid")
    res.redirect('/forgetPassword')
  }
}

module.exports.otpVerification = (req,res)=>{
  if(req.body.otp == req.session.otp){
    res.render('pages/newPassword')
  }
  else{
    const msg = "Invalid OTP Please Enter Right OTP"
    res.render('pages/otp' , {msg : msg})
  }
}

module.exports.newforgetedPassword = async (req, res)=>{
  try {
    const user = await userSchema.findByIdAndUpdate(req.session.adminId, {password: req.body.newPassword})
    if(user){
      req.flash("success", "Password Changed Successfully")
      res.redirect('/login')
    } else{
      req.flash("error", "Something went wrong")
      res.redirect('/forgetPassword')
    }
  } catch (error) {
    console.log(error)
  }
}