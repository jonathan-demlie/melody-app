require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    
    try {
        console.log("MONGODB_URL:", process.env.MONGODB_URL);

        await mongoose.connect(process.env.MONGODB_URL, {
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
