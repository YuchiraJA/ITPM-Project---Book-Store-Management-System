const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    BookTitle:{
        type:String,
        require:true
    },
    Price:{
        type:String,
        require:true
    },
    PersonName:{
        type:String,
        require:true
    },
    NIC:{
        type:String,
        require:true
    },
    TeliphoneNumber:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    PostalCode:{
        type:String,
        require:true
    },    
    Address:{
        type:String,
        require:true
    },
});

module.exports = mongoose.model("Orders",orderSchema);