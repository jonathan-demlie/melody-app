require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    const MONGODB_URL= 'mongodb://localhost:27017/melodyDB'
    
    try {
        console.log("MONGODB_URL:", process.env.MONGODB_URL); // Add this line

        await mongoose.connect(MONGODB_URL || '', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });

        console.log("MongoDB Connected successfully");

    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
