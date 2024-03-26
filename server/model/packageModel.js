const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const packageShema = new Schema({
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
    describe: {
        type:String
    }
    
},{ timestamps: true });

const Package = mongoose.model('packages', packageShema);
module.exports = Package