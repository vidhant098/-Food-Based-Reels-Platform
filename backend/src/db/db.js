const mongoose = require('mongoose');

async function connectDB() {
  const mongoUrl = process.env.MONGODB_URL?.trim();

  if (!mongoUrl) {
    throw new Error('MONGODB_URL is missing');
  }

  await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log('database connected');
}

module.exports = connectDB;
