const express = require("express");
require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./DB/conn");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: true,
  credentials: true
}));

// DB + Models
connectDB();
require("./model/userSchema");
require("./model/hallSchema");
require("./model/bookingSchema");

// Routes
app.use(require("./router/authRoutes"));
app.use(require("./router/bookingRoutes"));
app.use(require("./router/hallRoutes"));

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});