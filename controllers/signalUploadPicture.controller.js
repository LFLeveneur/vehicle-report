// Required SignalModel required for the request type
const SignalModel = require('../models/signal.model');

// Send path picture to the database
module.exports.signalUploadPicture = async (req, res) => {
    // Set id of the element in the database (id is ObjectId in MongoDB)
    const date = req.body.date;

    // Set path of the picture (replace the / with \)
    const path = req.file.path.replace(/\\/g, "/")

    try {
      // Update the picture in the database with the new path of the picture
      await SignalModel.findOneAndUpdate({'date': date}, { $set: { picture: "http://localhost:3000/" + path } }, { new: true });
      
      // Picture uploaded successfully
      res.status(200).send(`Picture uploaded successfully : ${date}`);
    }
    catch (err) {
      // An error
      res.status(500).send(err);
    }
}
