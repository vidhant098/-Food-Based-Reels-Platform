//  start server hare
require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('database connection failed:', err.message);
    process.exit(1);
  });

