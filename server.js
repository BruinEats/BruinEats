const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/food', require('./routes/foodRouter'));
app.use('/api/dininghall', require('./routes/diningHallRouter'));
app.use('/api/menu', require('./routes/menuRouter'));
app.use('/api/search', require('./routes/searchRouter'));
app.use('/api/review', require('./routes/reviewRouter'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
