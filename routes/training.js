const router = require("express").Router();
const  Training  = require("../models/training");
const  File  = require("../models/file");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/add', (req, res) => {
    const{
        title,
        image,
        description,
        category,
        price
    }=req.body;
   console.log(req.body)
    const training = new Training({
        title:title,
        image:image,
        description:description,
        category:category,
        price:price
    });
   
    training.save().then(training=>res.json(training))


  });

router.get('/list', (req, res) => {
   
 
    const training = Training.find()
    .then(trainings=>res.status(200).json(trainings))
    .catch(error=>{res.status(500).json(error)})

    
  });

router.post('/upload', upload.array('avatar', 10), (req, res) => {
    const files = req.files.map(file => ({
      name: file.originalname,
      contentType: file.mimetype,
      data: file.buffer,
    }));
  
    File.insertMany(files, (error) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.json({ message: 'Files uploaded successfully' });
      }
    });
  });

module.exports = router;
