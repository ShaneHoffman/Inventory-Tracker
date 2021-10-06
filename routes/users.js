const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  addUser,
  addInventory
} = require('../controllers/users');


router.route('/').get(getAllUsers).post(addUser);
router.route('/inventory/:username').post(addInventory);

module.exports = router;