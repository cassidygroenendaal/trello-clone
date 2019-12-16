const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Model1Schema = new Schema({
  name: {
    type: String,
    trim: true
  }
});

const Model1 = mongoose.model("Model1", Model1Schema);

module.exports = Model1;
