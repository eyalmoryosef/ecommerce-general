import e from "express";
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

//@desc delete product
//@route  delete /api/products/:id
//@access   private/admin
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(200).json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//@desc create product
//@route  post /api/products
//@access   private/admin
const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.userId,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update a product
//@route  put /api/products/:id
//@access   private/admin
const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
  } else {
    res.status(404);
    throw new Error("product not found");
  }

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
