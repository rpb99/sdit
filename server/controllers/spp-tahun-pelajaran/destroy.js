const { SppTahunPelajaran } = require("../../models");

module.exports = async (req, res) => {
  const data = await SppTahunPelajaran.findByPk(req.params.id);

  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "Data is not found" });
  }

  await data.destroy();

  return res.json({
    success: true,
    message: "Data deleted",
  });
};
