require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const songRoutes = require('./src/routes/songRoutes');

const app = express();

// connect to database
connectDB();

// Allow requests from all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', songRoutes);


app.listen(PORT, () => {
    console.log(`Server is connected on Port: ${PORT}`);
});
