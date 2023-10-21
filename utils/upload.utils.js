// Required:
const multer = require('multer');

// Set the storage & set the file name
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../data/upload`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Set the file filter to only allow images
const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);
    }
};

// Initialize the multer object with the storage and file filter
let upload = multer({ storage: storage, fileFilter: fileFilter,});

// Export the upload object
module.exports = upload.single('picture')