const express = require('express');
const router = express.Router();

const {
  getAllItems,
  addItem,
  getItem,
  editItem,
  deleteItem
} = require('../controllers/items');


router.route('/').get(getAllItems).post(addItem);
router.route('/:id').get(getItem).patch(editItem).delete(deleteItem);

module.exports = router;