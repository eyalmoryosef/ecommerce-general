import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.get("/", (req, res) => {
  res.status(200).send("api is running...");
});
app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.status(200).json(product);
});

app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`
  );
});
