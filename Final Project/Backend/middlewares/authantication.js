const jwt = require("jsonwebtoken");
const principalSchema = require("../model/principalSchema");
const teacherSchema = require("../model/teacherSchema");
const studentSchema = require("../model/studentSchema");

const principalAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Token Not Found" });

    const finalToken = token.slice(7);
    const decode = jwt.verify(finalToken, "node");

    if (await principalSchema.findById(decode.userData._id)) {
      req.user = decode;
      next();
    } else {
      res.status(404).json({ msg: "Principal Not Found" });
    }
  } catch (error) {
    console.error("Not Authorized Principal: " + error);
    res.status(500).json({ msg: "Error Authentication", error });
  }
};

const teacherAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Token Not Found" });

    const finalToken = token.slice(7);
    const decode = jwt.verify(finalToken, "node");
    
    if (decode.teacherData) {
      if (await teacherSchema.findById(decode.teacherData._id)) {
        req.user = decode;
        next();
      } else {
        res.status(404).json({ msg: "Teacher Not Found" });
      }
    } else {
      res.status(401).json({ msg: "You Are Not a Teacher!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Authentication", error });
  }
};

const studentAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Token Not Found" });

    const finalToken = token.slice(7);
    const decode = jwt.verify(finalToken, "node");

    if (await studentSchema.findById(decode.studentData._id)) {
      req.user = decode;
      next();
    } else {
      res.status(404).json({ msg: "Student Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Authentication", error });
  }
};

module.exports = { principalAuth, teacherAuth, studentAuth };
