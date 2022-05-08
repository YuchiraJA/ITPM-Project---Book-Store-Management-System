const mongoose = require('mongoose');
const { stringify } = require('querystring');

const offerSchema = new mongoose.Schema({
    otitle:{
        type:String,
        require:true
    },
    oDes:{
        type:String,
        require:true
    },
    oImage:{
        type:String,
        require:true
    },   
});

module.exports = mongoose.model("Offers",offerSchema);
