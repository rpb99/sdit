const { SekolahAsal } = require("../../models");

module.exports = async (req, res) => {
  const sekolahAsal = await SekolahAsal.findAll({ where: { id_siswa: req.params.id_siswa } });

  if (!sekolahAsal)
    return res
      .status(404)
      .json({ success: false, message: "sekolah asal is not found" });

  return res.json({ success: true, data: sekolahAsal });
};
