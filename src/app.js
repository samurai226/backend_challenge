// src/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ratesRoute = require('./routes/rates');

const app = express();

// Middlewares globaux
app.use(morgan('dev'));          // Logger HTTP
app.use(cors());                 // Autoriser les requêtes cross-origin
app.use(express.json());         // Parseur JSON

// Routes
app.use('/api', ratesRoute);

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).send("API is healthy");
});

module.exports = app;
