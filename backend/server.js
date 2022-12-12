import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

app.use("/api/products", productRoute);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).send("api is running...");
});

app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow
      .bold
  );
});
