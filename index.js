const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files like index.html
console.log('Environment Variables:', process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);
// Razorpay instance using environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order endpoint
app.post('/create-order', async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: 'INR',
    receipt: 'receipt_order_' + Math.random().toString(36).substring(7),
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
app.get('/get-key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});
