import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoConnectionString = process.env.DB_CONNECTION_STRING || "";

    await mongoose.connect(mongoConnectionString);

    console.log("Mongo db connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
