const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    SupplierID:{
        type:String,
        require:true
    },
    Fullname:{
        type:String,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    ContactNo:{
        type:String,
        require:true
    },
    ItemsPurchased:{
        type:String,
        require:true
    }
    
});

module.exports = mongoose.model("Suppliers",supplierSchema);