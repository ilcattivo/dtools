const mongoose = require('mongoose');

const toolTypeSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: 50,
  },
  shortname: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 20,
  },
  descr: {
    required: true,
    type: String,
    maxlength: 1000,
  },
  image: {
    type: String,
  },
});

const ToolType = mongoose.model('ToolType', toolTypeSchema);

module.exports = { ToolType };
