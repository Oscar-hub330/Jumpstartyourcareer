/* eslint-disable no-undef */
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast
      maxPoolSize: 10,               // connection pooling
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    // crash fast so process manager can restart
    process.exit(1);
  }
};

export default connectDB;
