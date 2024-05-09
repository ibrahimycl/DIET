const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    sendData: {
        type: Object,
        required:true
    },
    resultData: {
        type: Object,
        required: true
    },
    isSuccess: {
        type: String
    }
},{ timestamps: true });

const Payment = mongoose.model('payment', paymentSchema);
module.exports = Payment;