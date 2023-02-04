const mongoose = require('mongoose');

const nextStation = new  mongoose.Schema({
    email :{
        type:String,
        required:true
    },
    currentCharge : {
        type:Number,
        required:true
    },
    milage : {
       type:Number,
       required:true
    },
    nextchargeD: {
       type:Number,
       required:true
    }
})
const registerD = new mongoose.model("distance",nextStation);

module.exports = registerD;