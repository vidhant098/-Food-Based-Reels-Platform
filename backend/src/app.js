// create  server hare

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodpartnerRoutes = require('./routes/food-partner.routes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
  ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : []),
]
  .map((origin) => origin.trim())
  .filter(Boolean);

// Helpful for Render debugging: prints resolved origin allowlist
console.log('CORS allowedOrigins:', allowedOrigins);


const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes); //api/auth  is prefix
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodpartnerRoutes);

module.exports = app;
