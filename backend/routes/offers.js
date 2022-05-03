const express = require('express');
const Offers = require('../models/offers');
var multer = require('multer')
var uniqid = require('uniqid')


const router = express.Router();

//save Feedback
router.post('/offer/save',(req,res) => {
    let newOffer = new Offers(req.body);

    newOffer.save((err) => {
        if(err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Feedback sent successful"
        });
    });

});



// get All Feedbacks [find() is mongoose predifined function to find db data]
router.get('/offers',(req,res) =>{
    Offers.find().exec((err,offers) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingOffers:offers
        });
    });
});



//get a specific feedback
router.get("/offer/:id",(req,res)=>{
    let offerId = req.params.id;
    Offers.findById(offerId,(err,offer)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            offer
        });
    });
});



//update offers ["findByIdAndUpdate" is , ]
router.put('/offer/update/:id',(req,res)=>{
    Offers.findByIdAndUpdate(
           //pass parameter as id
           req.params.id,
            {
                //update whole body
                $set:req.body
            },
            (err,offer)=>{
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


//delete offer
router.delete('/offer/delete/:id',(req,res) =>{
    Offers.findByIdAndRemove(req.params.id).exec((err,deletedOffer) =>{
        if(err) return res.status(400).json({
                message:"delete unsuccesful",err
        });
        return res.json({
            success:"delete successfully",deletedOffer
        });
    });
});



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

router.post('/offer/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

})



module.exports = router;