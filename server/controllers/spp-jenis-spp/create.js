const Validator = require("fastest-validator");
const v = new Validator();

const { SppJenisSPP } = require("../../models");

module.exports = async (req, res) => {
  const schema = {
    nama: "string|empty:false",
    nominal: "number|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length)
    return res.status(400).json({ status: "error", message: validate });

  const data = await SppJenisSPP.create(req.body);

  return res.json({ success: true, data });
};
