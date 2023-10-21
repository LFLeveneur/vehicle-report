// Required:
const router = require('express').Router();

// Required signalNewController for receiving the request
const signalNewController = require('../controllers/signalNew.controller');
router.post("/new", signalNewController.signalNew); // Route for creating a new signal

// Required signalUpdateController for receiving the request
const signalUpdateController = require('../controllers/signalUpdate.controller');
router.post("/update", signalUpdateController.signalUpdate); // Route for update a signal

// Required uploadPictureController for uploading the picture
const uploadPictureController = require('../controllers/signalUploadPicture.controller');
const upload = require('../utils/upload.utils');
router.post("/picture", upload, uploadPictureController.signalUploadPicture); // Route for uploading a picture

// Export the router
module.exports = router;