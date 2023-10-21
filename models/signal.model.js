// Required:
const mongoose = require('mongoose');

// Define our signal schema
const signalSchema = new mongoose.Schema({
    imatriculation: {
        type: String,
        required: true,
        length: 9,
        trim: true // remove white spaces
    },
    situation: {
        type: String,
        trim: true,
        default: 'Pas de situation transmise'
    },
    picture: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
    },
    dateFormat: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    idTicket : {
        type: String,
        required: true,
        trim: true
    }
});

// Create a model for our data
const SignalModel = mongoose.model("signal", signalSchema);

// Export the model
module.exports = SignalModel;