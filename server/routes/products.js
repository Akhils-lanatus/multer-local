const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

module.exports = function (upload) {
  // POST /api/products - Create a new product
  router.post("/", upload.single("image"), async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const imageUrl = req?.file?.path;
      const tempUrl = imageUrl?.replace(`server\\`, "");
      console.log(tempUrl);
      const newProduct = new Product({
        name,
        description,
        price,
        imageUrl: tempUrl,
      });

      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // GET /api/products - Get all products
  router.get("/", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  return router;
};
