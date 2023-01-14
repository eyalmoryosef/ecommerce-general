//npm packages
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";

//routes
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

//middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/", (req, res) => {
  res.status(200).send("api is running...");
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow
      .bold
  );
});
