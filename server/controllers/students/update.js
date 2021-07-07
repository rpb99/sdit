const Validator = require("fastest-validator");
const v = new Validator();

const { Student } = require("../../models");

module.exports = async (req, res) => {
  const schema = {
    nis: "string|empty:false",
    nama: "string|empty:false",
    tgl_lahir: "string|empty:false",
    tempat_lahir: "string|empty:false",
    jenis_kelamin: "string|empty:false",
    telepon: "string|empty:false",
    alamat: "string|empty:false",
    foto: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  // if (validate.length)
  //   return res.status(400).json({ status: "error", message: validate });

  const student = await Student.findByPk(req.params.id);

  if (!student)
    return res
      .status(404)
      .json({ success: false, message: "Student is not found" });

  const multer = require('multer')

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + "-" + file.originalname)
    },
  })

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }


  const upload = multer({ storage, fileFilter, limits: { fileSize: 6000000 } }).single('image')


  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === 'LIMIT_FILE_SIZE') return res.status(414).json({ success: false, message: 'Ukuran Foto maximum 6mb' })
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(`err`, err)
    }

    req.body.foto = req.file?.path

    await student.update(req.body);

    return res.json({ success: true, data: student });
  })
};
