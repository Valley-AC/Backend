const router = require("express").Router();
const  File  = require("../models/file");


router.post('/upload-image',async (req,res)=>{
const {base64} = req.body
try {
    File.create({image:base64})
    res.send({status: 'ok',data:res.data})
}catch (error){
res.send({status:'error',data:error})
}
})

router.get('/get-image', async (req,res)=>{
    try {
File.find({}).then(data =>{
    res.send({status:'ok',data:data})
} )
    }catch (err){
        res.send({status:'error',data:err})
    }

})

module.exports = router;
