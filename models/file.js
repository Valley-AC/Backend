const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    image: String,
   
});

const File = mongoose.model("file", fileSchema);

module.exports =File;
