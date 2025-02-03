import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDatabse = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};
connectToDatabse();
export default connectToDatabse;
