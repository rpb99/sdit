const { SppTahunPelajaran } = require("../../models");

module.exports = async (req, res) => {
  const data = await SppTahunPelajaran.findAll();

  return res.json({ success: true, data });
};
