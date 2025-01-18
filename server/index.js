const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const emailConfigRoutes = require('./routes/emailConfigRoutes');
app.use('/api', emailConfigRoutes);



// Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/output', express.static('output'));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


