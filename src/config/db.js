import mongoose from "mongoose";
import 'dotenv/config';

const MONGO_URL = process.env.MONGO_URL;

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URL);
    if (connection) {
      console.log('Connected to MongoDB successfully');
    }
  }
  catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

export default connectToDb;
