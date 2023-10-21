// Required SignalModel required for the request type
const SignalModel = require('../models/signal.model');

// Create a new signal
module.exports.signalNew = async (req, res) => {
    // Destructuring the request body
    const {imatriculation, date, dateFormat, idTicket} = req.body;
    try {
        // Create a new signal model
        const signal = await SignalModel.create({imatriculation, date, dateFormat, idTicket});
        res.status(200).json({ imatriculation: signal.imatriculation, date: signal.date, dateFormat: signal.dateFormat, idTicket: signal.idTicket });
    }
    catch (err) {
        // If an error occurs, send it to the client
        res.status(500).json({ err });
    }
}