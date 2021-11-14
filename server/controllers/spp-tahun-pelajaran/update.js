const Validator = require("fastest-validator");
const v = new Validator();

const { SppTahunPelajaran } = require("../../models");

module.exports = async (req, res) => {
  const schema = {
    nama: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length)
    return res.status(400).json({ status: "error", message: validate });

  const data = await SppTahunPelajaran.findByPk(req.params.id);

  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "Data is not found!" });
  }

  await data.update(req.body);

  return res.json({ success: true, data });
};
