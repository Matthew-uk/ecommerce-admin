import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("CONNECTED TO DATABASE!!!");
  } catch (error) {
    console.error(error); //Log Error!!!
  }
};
