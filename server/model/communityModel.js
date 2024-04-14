const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const communitySchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    description: {
        type:String
    },
    imagePath : {
        type:String
    },
    like:{
        type:Number,
        default: 0 //TODO 0 altına düşmesini engelle
    },
    likedUsers:{
        type: Array,
        default:[]
    }
},{ timestamps: true });

const Community = mongoose.model('community', communitySchema);
module.exports = Community