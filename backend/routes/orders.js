const express = require('express');
const Orders = require('../models/orders');

const router = express.Router();

//save Inventry
router.post('/order/save',(req,res) => {
    let newOrder = new Orders(req.body);

    newOrder.save((err) => {
        if(err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Order saved successful"
        });
    });

});


// get Inventry
router.get('/orders',(req,res) =>{
    Orders.find().exec((err,orders) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingOrders:orders
        });
    });
});



//get a specific inventry
router.get("/order/:id",(req,res)=>{
    let orderId = req.params.id;
    Orders.findById(orderId,(err,order)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            order
        });
    });
});



//update inventrys
router.put('/order/update/:id',(req,res)=>{
    Orders.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            (err,order)=>{
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


//delete inventry
router.delete('/order/delete/:id',(req,res) =>{
    Orders.findByIdAndRemove(req.params.id).exec((err,deletedOrder) =>{
        if(err) return res.status(400).json({
                message:"delete unsuccesful",err
        });
        return res.json({
            success:"delete successfully",deletedOrder
        });
    });
});



module.exports = router;