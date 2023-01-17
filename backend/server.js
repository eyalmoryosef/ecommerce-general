//npm packages
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import morgan from "morgan";

//routes
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

//middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).send("api is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow
      .bold
  );
});
