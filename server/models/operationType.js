const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const operationTypeSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: 100
  },
  shortname: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 20
  },
  descr: {
    required: true,
    type: String,
    maxlength: 1000
  },
  toolTypeId: {
    required: true,
    type: ObjectId,
    maxlength: 100
  }
});

const OperationType = mongoose.model('OperationType', operationTypeSchema);

module.exports = { OperationType };
