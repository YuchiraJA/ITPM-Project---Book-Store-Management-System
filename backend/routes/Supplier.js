const express = require('express');
const Suppliers = require('../models/Supplier');

const router = express.Router();

//save Supplier
router.post('/supplier/save',(req,res) => {
    let newSupplier = new Suppliers(req.body);

    newSupplier.save((err) => {
        if(err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"supplier saved successful"
        });
    });

});


// get Supplier
router.get('/suppliers',(req,res) =>{
    Suppliers.find().exec((err,suppliers) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingSuppliers:suppliers
        });
    });
});



//get a Supplier inventry
router.get("/supplier/:id",(req,res)=>{
    let supplierId = req.params.id;
    Suppliers.findById(supplierId,(err,supplier)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            supplier
        });
    });
});



//update Supplier
router.put('/supplier/update/:id',(req,res)=>{
    Suppliers.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            (err,supplier)=>{
                if(err){
                    return res.status(400).json({
                        error:err
                    });
                }
                return res.status(200).json({
                    success:"updated successfully"
                });
            }
    );
});


//delete Supplier
router.delete('/supplier/delete/:id',(req,res) =>{
    Suppliers.findByIdAndRemove(req.params.id).exec((err,deletedSupplier) =>{
        if(err) return res.status(400).json({
                message:"delete unsuccesful",err
        });
        return res.json({
            success:"delete successfully",deletedSupplier
        });
    });
});



module.exports = router;