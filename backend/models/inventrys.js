const mongoose = require('mongoose');
const { stringify } = require('querystring');

const inventrySchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    language:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    publisher:{
        type:String,
        require:true
    },
    isbn:{
        type:String,
        require:true
    },
    details:{
        type:String,
        require:true
    },    
    image:{
        type:String,
        require:true
    },
});

module.exports = mongoose.model("Inventrys",inventrySchema);