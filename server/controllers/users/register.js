const Validator = require("fastest-validator");
const v = new Validator();

const { User, Student } = require("../../models");
const { sendTokenRes } = require("../../helper");

module.exports = async (req, res) => {
  const schema = {
    nis: "string|empty:false",
    first_name: "string|empty:false",
    last_name: "string|optional",
    email: "string|empty:false",
    password: "string|min:6",
    avatar: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length)
    return res.status(400).json({ status: "error", message: validate });

  try {
    const student = await Student.findOne({ where: { nis: req.body.nis } })

    if (!student) {
      return res.status(404).json({ status: "error", message: 'NIS anda belum terdaftar' });
    }

    const user = await User.create(req.body);

    sendTokenRes(user, 201, res);
  } catch (error) {
    const { message } = error.errors[0];

    if (message.includes("UNIQUE_USER_EMAIL"))
      return res
        .status(400)
        .json({ success: false, message: "Email must be unique" });
  }
};
