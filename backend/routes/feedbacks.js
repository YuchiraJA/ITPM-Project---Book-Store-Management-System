const express = require('express');
const Feedbacks = require('../models/feedbacks');

const router = express.Router();

//save Feedback
router.post('/feedback/save',(req,res) => {
    let newFeedback = new Feedbacks(req.body);

    newFeedback.save((err) => {
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
router.get('/feedbacks',(req,res) =>{
    Feedbacks.find().exec((err,feedbacks) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingFeedbacks:feedbacks
        });
    });
});



//get a specific feedback
router.get("/feedback/:id",(req,res)=>{
    let feedbackId = req.params.id;
    Feedbacks.findById(feedbackId,(err,feedback)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            feedback
        });
    });
});



//update feedbacks
router.put('/feedback/update/:id',(req,res)=>{
    Feedbacks.findByIdAndUpdate(
           req.params.id,
           {
               $set:req.body
           },
           (err,feedback)=>{
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


//delete feedback ["findByIdAndRemove" is mongoose function]
router.delete('/feedback/delete/:id',(req,res) =>{
    Feedbacks.findByIdAndRemove(req.params.id).exec((err,deletedFeedback) =>{
        if(err) return res.status(400).json({
                message:"delete unsuccesful",err
        });
        return res.json({
            success:"delete successfully",deletedFeedback
        });
    });
});



module.exports = router;