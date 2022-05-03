const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    cname:{
        type:String,
        require:true
    },
    cemail:{
        type:String,
        require:true
    },
    feedtype:{
        type:String,
        require:true
    },
    feedmessage:{
        type:String,
        require:true
    },
});

module.exports = mongoose.model("Feedbacks",feedbackSchema);