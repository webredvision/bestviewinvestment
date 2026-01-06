import mongoose from "mongoose";

let isConnected = false;

export const ConnectDB = async () => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined in environment variables.");
    return; // Don't throw error, just return to allow app to function with empty data
  }

  try {
    await mongoose.connect(uri, {
      bufferCommands: false,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};
