// server/server.js

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const productRoutes = require("./routes/products");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://akhil1911:akhil1911@cluster0.mfy41zc.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => console.log(`DB HOST::${conn.connection.host}`))
  .catch((err) => console.log("DB ERROR" + err));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/products", productRoutes(upload));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
