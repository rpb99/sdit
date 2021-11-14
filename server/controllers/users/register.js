const Validator = require("fastest-validator");
const v = new Validator();

const { User, Student } = require("../../models");
const { sendTokenRes } = require("../../helper");

module.exports = async (req, res) => {
  const schema = {
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
    if (req.body.id_siswa) {
      const student = await Student.findOne({
        where: { id: req.body.id_siswa },
      });

      if (!student) {
        return res
          .status(404)
          .json({ status: "error", message: "Siswa belum terdaftar" });
      }
    }

    const user = await User.create(req.body);

    sendTokenRes(user, 201, res);
  } catch (error) {
    // console.log(`error`, error);
    const { message } = error?.errors[0];

    if (message.includes("UNIQUE_USER_EMAIL"))
      return res
        .status(400)
        .json({ success: false, message: "Email must be unique" });
  }
};
