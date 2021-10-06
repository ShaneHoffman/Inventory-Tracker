const mongoose = require('mongoose');

const connectMongo = (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectMongo;