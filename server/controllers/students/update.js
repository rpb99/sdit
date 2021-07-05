const Validator = require("fastest-validator");
const v = new Validator();

const { Student } = require("../../models");

module.exports = async (req, res) => {
  const schema = {
    nis: "string|empty:false",
    nama: "string|empty:false",
    tgl_lahir: "string|empty:false",
    tempat_lahir: "string|empty:false",
    jenis_kelamin: "string|empty:false",
    telepon: "string|empty:false",
    alamat: "string|empty:false",
    foto: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length)
    return res.status(400).json({ status: "error", message: validate });

  const student = await Student.findByPk(req.params.id);

  if (!student)
    return res
      .status(404)
      .json({ success: false, message: "Student is not found" });

  await student.update(req.body);

  return res.json({ success: true, data: student });
};
