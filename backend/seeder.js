import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import Order from "./models/orederModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import products from "./data/products.js";
import users from "./data/users.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

//reseting the data inside the database
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("data imported!".green.inverse);
    process.exit(1);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

//deleteing all the data from database

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("data destroyed!".green.inverse);
    process.exit(1);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
