const mongoose = require("mongoose");
let trainingSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price:Number,
    imageUrl: String


  });
  const Training = mongoose.model("training", trainingSchema);
  module.exports =Training;