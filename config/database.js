const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Use environment variable for MongoDB connection string
    // For testing in the development environment, a test MongoDB URI can be used
    // In production, this should be set to a MongoDB Atlas connection string
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lnd_app';
    
    // Connect to MongoDB
    // Note: useNewUrlParser and useUnifiedTopology are deprecated in newer MongoDB driver versions
    // but kept for compatibility with older MongoDB versions
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    // Don't exit the process in development to allow for retry mechanisms
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
