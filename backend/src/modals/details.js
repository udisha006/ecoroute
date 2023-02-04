const mongoose = require('mongoose');

const patientDSchema = new  mongoose.Schema({
    currentCharge : {
        type:Number,
        required:true
    },
    chargePerUnit : {
       type:Number,
       required:true
    },
    milage: {
       type:Number,
       required:true
    }
})

const registerD = new mongoose.model("infos",patientDSchema);

module.exports = registerD;