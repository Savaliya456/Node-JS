const express = require("express");
const routes = express.Router();
const userSchema = require("../model/user");
const courseSchema = require("../model/course");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authantication = require("../middleware/authantication");

routes.post("/signup", async (req, res) => {
  try {
    const isAlready = await userSchema.findOne({ email: req.body.email });
    if (isAlready)
      return res.status(400).json({ message: "Email already exists" });

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await userSchema.create(req.body);
    if (user) {
      const token = jwt.sign({ user: user }, "seckey");
      res.status(200).json({ user, token });
    } else {
      res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error creating while Signup" });
  }
});

routes.post("/signin", async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const passCheck = await bcrypt.compare(req.body.password, user.password);

    if (!passCheck) return res.status(400).json({ message: "Wrong Password" });
    else {
      const token = jwt.sign({ user: user }, "seckey");
      res.status(200).json({ token , user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error creating while Signin" });
  }
});

routes.get("/home", authantication, async (req, res) => {
  try {
    const courses = await courseSchema.find({});
    res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error creating while Signin" });
  }
});

routes.get("/profile", authantication, (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error creating while Profile Show" });
  }
});

module.exports = routes;
