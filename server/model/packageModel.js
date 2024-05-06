const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const packageSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    isOnlineCall: {
        type: Boolean,
        required: true
    },
    month: {
        type: Number,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type:String
    },
    dietitianId: { 
        type: Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    active:{
        type:Boolean,
        required:true
    },
    iban: {
        type: String,
        required: true
      },
    accountHolderName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    }
},{ timestamps: true });

const Package = mongoose.model('packages', packageSchema);
module.exports = Package