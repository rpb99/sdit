const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async protect(req, res, next) {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Production

    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }

    if (!token)
      res
        .status(401)
        .json({ success: false, msg: "Not authorized to access this route" });

    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, msg: "Not authorized to access this route" });
    }
  },
};
