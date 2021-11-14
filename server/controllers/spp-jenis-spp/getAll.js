const { SppJenisSPP } = require("../../models");

module.exports = async (req, res) => {
  const data = await SppJenisSPP.findAll();

  return res.json({ success: true, data });
};
