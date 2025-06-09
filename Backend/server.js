const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors())

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/harsha', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Item Schema
const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

// API to add an item
app.post('/addItem', async (req, res) => {
  try {
    const { itemName } = req.body;
    if (!itemName) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const item = new Item({ itemName });
    const savedItem = await item.save();
    res.status(201).json({ itemId: savedItem._id, itemName: savedItem.itemName });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// API to get all items
app.get('/getItems', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items.map(item => ({ itemId: item._id, itemName: item.itemName })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});