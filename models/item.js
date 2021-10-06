// Model for all Items i.e. Shoes, Retail

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'shoe name must be provided']
  },
  retailPrice: {
    type: Number,
    required: [true, 'shoe price must be provided']
  },
  image: {
    type: String
  },
  itemType: {
    type: String,
    required: [true, 'item type must be provided']
  },
  stockxID: {
    type: String
  }
});

module.exports = mongoose.model('Item', itemSchema);