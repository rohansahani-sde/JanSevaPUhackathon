import mongoose from "mongoose";

const connectDB = async () => {
  const url = process.env.MONGO_URI;

  if (!url) {
    console.log("MONGO_URI is missing. Add it to backend/.env before starting the API.");
    process.exit(1);
  }

  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
