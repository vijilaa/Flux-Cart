const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String, // Changed to String to handle various formats and leading zeros
        required: true 
    },
    cardNumber: {
        type: String, // Best practice is to not store this directly, but if you must, use a string
        required: true
    },
    expiry: {
        type: String, // Using String for "MM/YY" format
        required: true
    },
    cvv: {
        type: String, // Using String to preserve any leading zeros
        required: true
    },
    quantity:{type:String},
    purchaseDate: {
        type: Date,
        default: Date.now // Correct way to set the default to the current time [1]
    },
    UserId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a 'User' model
        required: true
    },
    productIds: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }]
});

module.exports = mongoose.model('Buy', BuyerSchema);