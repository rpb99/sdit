const Validator = require("fastest-validator");
const v = new Validator();

const { SekolahAsal } = require('../../models')

module.exports = async (req, res) => {

    const sekolahAsal = await SekolahAsal.findByPk(req.params.id);

    if (!sekolahAsal)
        return res
            .status(404)
            .json({ success: false, message: "sekolah asal is not found" });

    await sekolahAsal.destroy();

    return res.json({
        success: true,
        message: `sekolah asal is deleted`,
    });
}