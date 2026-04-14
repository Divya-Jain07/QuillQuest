const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/quillquest");
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

// ONLY JOB TO CONNECT THE MONGODB TO BACKEND