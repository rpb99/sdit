const express = require('express')
const app = express()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
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

app.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (!req.file) return res.status(422).json({ success: false, message: 'Image harus di upload' })
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            if (err.code === 'LIMIT_FILE_SIZE') return res.status(414).json({ success: false, message: 'Filesize too large' })
            console.log(`err`, err)
            res.send(err)
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log(`err`, err)
        }
        res.send(req.file.path)
    })
})

module.exports = app;