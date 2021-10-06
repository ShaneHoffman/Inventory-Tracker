const express = require('express');
const app = express();

const connectMongo = require('./db/connect');

const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');

require('dotenv').config();

// Allow for interception of JSON POST requests
app.use(express.json());


/*

Item API Routes: /api/v1/items
  Shoe API Route: /shoes

User API Routes: /api/v1/users
  Inventory API Route: /inventory

*/


app.use('/api/v1/items', itemsRouter);
app.use('/api/v1/users', usersRouter);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  }
  catch(error) {
    console.error(error);
  }
};

start();