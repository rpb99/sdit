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

    req.body.id_siswa = req.query.id_siswa

    const sekolahAsal = await SekolahAsal.create(req.body);

    return res.json({ success: true, data: sekolahAsal })
}