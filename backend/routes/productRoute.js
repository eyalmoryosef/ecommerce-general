import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createProductReview,
  getProductReviews,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct, protect, admin);
router.route("/top").get(getTopProducts);
router
  .route("/:id/reviews")
  .post(protect, createProductReview)
  .get(getProductReviews);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(updateProduct, protect, admin);

export default router;
