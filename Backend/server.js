const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5001;
const DB_URI = 'mongodb://localhost:27017/project4'; // MongoDB URI

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Static folders for accessing uploads
app.use('/images', express.static(path.join(__dirname, 'upload/song')));
app.use('/url', express.static(path.join(__dirname, 'upload/songaudio')));

// Connect to MongoDB
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/', authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
