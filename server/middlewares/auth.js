const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token;

  // Development Postman
  // if (req.headers.authorization?.startsWith("Bearer")) {
  //   token = req.headers.authorization.split(" ")[1];
  // }
  // Production
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token)
    res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};
