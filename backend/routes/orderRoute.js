import express from "express";
import { get } from "mongoose";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliverd,
  getUserOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliverd").put(protect, admin, updateOrderToDeliverd);

export default router;
