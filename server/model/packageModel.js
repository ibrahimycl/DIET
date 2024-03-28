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
    dietitianId: { // Diyetisyen ID'si
        type: Schema.Types.ObjectId,
        ref: 'users', // Diyetisyen şemasına referans
        required: true
    }
},{ timestamps: true });

const Package = mongoose.model('packages', packageSchema);
module.exports = Package