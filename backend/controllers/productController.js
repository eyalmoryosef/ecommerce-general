import e from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

//@desc  fetch all products from database
//@route  GET /api/products/
//@access   public
const getProducts = expressAsyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : "";

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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

//@desc create new review
//@route  post /api/products/:id/reviews
//@access   private
const createProductReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user._id.toString() === req.userId.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    } else {
      const user = await User.findById(req.userId);
      const review = {
        name: user.name,
        rating: Number(rating),
        comment,
        user: req.userId,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.numReviews;

      await product.save();
      res.status(201).json({ message: "review added" });
    }
  } else {
    res.status(404);
    throw new Error("product not found");
  }

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc get product review
//@route  get /api/products/:id/reviews
//@access   private
const getProductReviews = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product.reviews);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//@desc get top rated products
//@route  get /api/products/top
//@access   public
const getTopProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.status(200).json(products);
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getProductReviews,
  getTopProducts,
};
