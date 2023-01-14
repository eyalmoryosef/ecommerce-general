import expressAsyncHandler from "express-async-handler";
import Order from "../models/orederModel.js";

//@desc  get order by id
//@route  Get /api/order/:id
//@access   private

export const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

//@desc  create ner order
//@route  POST /api/orders/
//@access   private
export const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items.");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.userId,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc  update order is paid
//@route  Put /api/order/:id/pay
//@access   private

export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

//@desc  update order is Deliverd
//@route  Put /api/order/:id/delivered
//@access   private/admin

export const updateOrderToDeliverd = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDeliverd = true;
    order.deliverdAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

//@desc  get all user orders
//@route  get /api/order/myorders
//@access   private

export const getUserOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.userId });
  res.status(200).json(orders);
});

//@desc  get all  orders
//@route  get /api/order
//@access   private/admin

export const getOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});
