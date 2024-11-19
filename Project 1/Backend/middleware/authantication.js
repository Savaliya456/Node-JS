const jwt = require("jsonwebtoken");
const userSchema = require("../model/user");

const authantication = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Token Not Found" });

    const finalToken = token.slice(7);

    const decode = jwt.verify(finalToken, "seckey");

    if (await userSchema.findById(decode.user)) {
      req.user = decode.user;
      next();
    } else {
      res.status(500).json({ msg: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not Authorized" });
  }
};

module.exports = authantication;