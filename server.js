const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json()); // Parse JSON bodies

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Import routes
const customerRoutes = require('./routes/customers');

// ✅ Use router for all /api/customers routes
app.use('/api/customers', customerRoutes);
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
