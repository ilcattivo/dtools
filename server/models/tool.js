const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const toolSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100,
    },
    descr: {
      required: true,
      type: String,
      maxlength: 5000,
    },
    toolType: {
      type: ObjectId,
      ref: 'ToolType',
      required: true,
    },
    operationType: {
      type: [{ type: ObjectId, ref: 'OperationType' }],
      ref: 'OperationType',
      required: true,
    },
    thumb: {
      type: String,
    },
    images: {
      type: Array,
    },
    title: {
      type: String,
    },
    detailedDescr: {
      type: String,
    },
    materials: {
      type: Array,
      required: true,
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tool = mongoose.model('Tool', toolSchema);
module.exports = { Tool };
