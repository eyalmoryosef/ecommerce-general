import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  console.log();
  try {
    await mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
