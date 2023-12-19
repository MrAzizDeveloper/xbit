const multer = require('multer')
const path = require('path')

// Creating and set storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req,file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// Initialize upload function
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: function (req,file,cb) {
        checkFiletype(file, cb)
    }
})


// Check file or image format
function checkFiletype(file,cb){
    const filetypes = /jpeg|png|jpg|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    }else{
        cb('Xato: Siz faqat rasm formatdagi faylni yuklay olasiz')
    }
}

module.exports = upload