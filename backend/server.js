import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/order", orderRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/", (req, res) => {
  res.status(200).send("api is running...");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow
      .bold
  );
});
