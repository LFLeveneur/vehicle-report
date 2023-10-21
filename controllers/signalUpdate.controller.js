// Required SignalModel required for the request type
const SignalModel = require('../models/signal.model');

// Update a signal
module.exports.signalUpdate = async (req, res) => {
    // Destructuring the request body
    const {situation, date} = req.body;
    try {
        // Update the signal
        await SignalModel.findOneAndUpdate({'date': date}, { $set: { situation: situation } }, { new: true });

        res.status(200).json({ situation: situation, date: date });
    }
    catch (err) {
        // If an error occurs, send it to the client
        res.status(500).json({ err });
    }
}