const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/user', require('./routes/userRouter'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
