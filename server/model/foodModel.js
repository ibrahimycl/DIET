const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const foodSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    name: {
        type: String,
        required:true
    },
    calories: {
        type: Number,
        required: true
    }
},{ timestamps: true });

const Food = mongoose.model('foods', foodSchema);
module.exports = Food