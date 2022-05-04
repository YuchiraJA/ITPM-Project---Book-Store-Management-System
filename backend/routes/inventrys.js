const express = require('express');
const Inventrys = require('../models/inventrys');
var multer = require('multer')
var uniqid = require('uniqid')


const router = express.Router();

//save Inventry
router.post('/inventry/save',(req,res) => {
    let newInventry = new Inventrys(req.body);

    newInventry.save((err) => {
        if(err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Inventry saved successful"
        });
    });

});


// get Inventry
router.get('/inventrys',(req,res) =>{
    Inventrys.find().exec((err,inventrys) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingInventrys:inventrys
        });
    });
});



//get a specific inventry
router.get("/inventry/:id",(req,res)=>{
    let inventryId = req.params.id;
    Inventrys.findById(inventryId,(err,inventry)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            inventry
        });
    });
});



//update inventrys
router.put('/inventry/update/:id',(req,res)=>{
    Inventrys.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            (err,inventry)=>{
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
router.delete('/inventry/delete/:id',(req,res) =>{
    Inventrys.findByIdAndRemove(req.params.id).exec((err,deletedInventry) =>{
        if(err) return res.status(400).json({
                message:"delete unsuccesful",err
        });
        return res.json({
            success:"delete successfully",deletedInventry
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

router.post('/inventry/upload',function(req, res) {
     
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