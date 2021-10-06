const Item = require('../models/item');
const axios = require('axios');

const getAllItems = async (req, res) => {
  const { type } = req.query;
  const queryObject = {};

  if(type) {
    queryObject.itemType = type;
  }

  let result = Item.find(queryObject);
  const items = await result;

  res.status(200).json({ items });
}

const addItem = async (req, res) => {
  const { name, stockxID } = req.body;

  // Add error checking for if the request goes bad, or an image isn't available
  if(!stockxID) {

    const productKw = name.split(' ').join('%20');
    
    const axRes = await axios.get(
      `https://stockx.com/api/browse?_search=${productKw}&dataType=product`, 
      { headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
    }});
    const product = axRes.data.Products[0];
    const id = product.id;
    const stockxName = product.shoe;
    const image = product.media.smallImageUrl;

    req.body.stockxID = id;
    req.body.name = stockxName;
    req.body.image = image;
  }

  const item = await Item.create(req.body);
  res.status(201).json({ item });
}

const getItem = async (req, res) => {
  const { id: itemID } = req.params;

  const result = await Item.findOne({ _id: itemID });
  if(!result) {
    // Add error catching
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
  }
  const item = result.toObject();

  const stockxID = item.stockxID;
  const axRes = await axios.get(
    `https://stockx.com/api/products/${stockxID}?includes=market`,
    { headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
    }});
  const data = axRes.data.Product;

  // Easily add whatever data is needed
  item.lowestAsk = data.market.lowestAsk;
  item.highestBid = data.market.highestBid;
  item.sales72 = data.market.salesLast72Hours;

  res.status(200).json({ item });
}

const editItem = async (req, res) => {
  const { name, image, retailPrice } = req.body;
  const { id: itemID } = req.params;
  const editObject = {};

  if(name) {
    editObject.name = name;
  }
  if(image) {
    editObject.image = image;
  }
  if(retailPrice) {
    editObject.retailPrice = retailPrice;
  }

  const result = await Item.findOneAndUpdate({ _id: itemID }, editObject, {
    new: true,
    runValidators: true
  });
  if(!result) {
    // Add error catching
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
  }

  res.status(200).json({ result });
}

const deleteItem = async (req, res) => {
  const { id: itemID } = req.params;

  const item = await Item.findOneAndDelete({ _id: itemID });
  if(!item) {
    // Add error catching
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
  }

  res.status(200).json({ success: true, item });
}

module.exports = {
  getAllItems,
  addItem,
  getItem,
  editItem,
  deleteItem
};
