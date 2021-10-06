const User = require('../models/user');
const Item = require('../models/item');
const InventoryItem = require('../classes/inventory-item');

const getAllUsers = async (req, res) => {
  const { username } = req.query;
  const queryObject = {};

  if(username) {
    queryObject.username = username;
  }

  let result = User.find(queryObject);
  const users = await result;

  res.status(200).send(users);
}

const addUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
}

const addInventory = async (req, res) => {
  const { username, itemID } = req.body;

  const result = await Item.findOne({ _id: itemID });
  if(!result) {
    // Add error catching
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
  }

  const item = new InventoryItem(result, req.body);
  console.log(item);

  res.send("hello");
  
}

module.exports = {
  getAllUsers,
  addUser,
  addInventory
};