const Validator = require("fastest-validator");
const v = new Validator();

const { User } = require("../../models");

module.exports = async (req, res) => {
  const schema = {
    first_name: "string|empty:false",
    last_name: "string|optional",
    avatar: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length)
    return res.status(400).json({ status: "error", message: validate });

  const { first_name, last_name, email, avatar } = req.body;

  const data = { first_name, last_name, avatar };

  const user = await User.findOne({ where: { email } });

  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "user is not found" });

  if (user.email !== req.user.email)
    return res
      .status(401)
      .json({ success: false, message: "method not allowed" });

  await user.update(data);

  return res.json({ success: true, data });
};
