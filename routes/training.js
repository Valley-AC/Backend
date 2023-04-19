const router = require("express").Router();
const  Training  = require("../models/training");
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });




router.post("/upload", upload.single("image"), (req, res) => {
 

  try {
           const title = req.body.title
           const description = req.body.description
           const category = req.body.category
           const price = req.body.price
           const imageUrl = req.file.path
           const training = new Training({ title:title, description:description,category:category,price:price,imageUrl:imageUrl });
            training.save();
         res.status(201).json(training);
        
       } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Internal server error' });
       }
});

// Get all trainings 
router.get('/', async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single training  by ID
router.get('/:id', async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'training post not found' });
    }
    res.json(training);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a training  by ID
router.put('/:id', upload.single("image"), async (req, res) => {
  try {
    const {title, description,category,price } = req.body;
    const imageUrl = req.file.path

    const training = await Training.findByIdAndUpdate(req.params.id, { title, description,category,price, imageUrl:imageUrl }, { new: true });
    if (!training) {
      return res.status(404).json({ message: 'Training post not found' });
    }
    res.json(training);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a training  by ID
router.delete('/:id', async (req, res) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Training post not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


