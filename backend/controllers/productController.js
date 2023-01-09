import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc  fetch all products from database
//@route  GET /api/products/
//@access   public
const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

//@desc  fetch single product from database
//@route  GET /api/products/:id
//@access   public
const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export { getProductById, getProducts };
