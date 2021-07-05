const Validator = require("fastest-validator");
const v = new Validator();

const { SekolahAsal } = require('../../models')

module.exports = async (req, res) => {
  const schema = {
    nama: "string|empty:false",
    surat_pindah: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length)
    return res.status(400).json({ status: "error", message: validate });

  const sekolahAsal = await SekolahAsal.findByPk(req.params.id);

  if (!sekolahAsal)
    return res
      .status(404)
      .json({ success: false, message: "sekolah asal is not found" });

  await sekolahAsal.update(req.body);

  return res.json({ success: true, data: sekolahAsal })
}