const mongoose = require("mongoose");
let trainingSchema = mongoose.Schema({
    title: String,
    image: String,
    description: String,
    category: String,
    price:Number

  });
  const Training = mongoose.model("training", trainingSchema);
  module.exports =Training;