import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded.id;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401);
        throw new Error(error);
      } else {
        res.status(401);
        throw new Error("You are not authorized ,  invalid token.");
      }
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("You are not authorized , no token found.");
  }
});

const admin = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("You are not authorized , admin access only!");
  }
});

export { protect, admin };
