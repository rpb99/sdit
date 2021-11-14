const { SppJenisSPP } = require("../../models");

module.exports = async (req, res) => {
  const data = await SppJenisSPP.findByPk(req.params.id);

  if (!data)
    return res
      .status(404)
      .json({ success: false, message: "data is not found" });

  return res.json({ success: true, data });
};
