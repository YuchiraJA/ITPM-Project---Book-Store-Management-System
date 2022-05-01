const mongoose = require('mongoose');
const { stringify } = require('querystring');

const offerSchema = new mongoose.Schema({
    otitle:{
        type:String,
        require:true
    },
    cemail:{
        type:String,
        require:true
    },
    feedmessage:{
        type:String,
        require:true
    },   
});

module.exports = mongoose.model("Offers",offerSchema);
