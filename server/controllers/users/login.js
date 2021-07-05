const Validator = require("fastest-validator");
const v = new Validator();

const { User } = require("../../models");
const { sendTokenRes } = require("../../helper");

module.exports = async (req, res) => {
  const schema = {
    email: "string|empty:false",
    password: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({ status: "error", message: validate });
  }

  const { email, password } = req.body;

  // check user
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `user with an email ${email} is not found`,
    });
  }

  // Check password matches
  const isMatch = await user.isMatch(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  return sendTokenRes(user, 200, res);
};
