require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRouter = require("./routes/AuthRoute/AuthRoute");
const inforDetails = require("./routes/DetailsRoutes/detailsRoute");
const paymentDetails = require("./routes/PaymentRotes/PaymentRoute");
const Passcode = require("./routes/PromoCodeRoute/PromoCodeRoute.js")
const OrderMake = require("./routes/OrderRoute/OrderRoute.js")



const connectDB = require('./config/db');
const productRoutes = require('./routes/Delivery/productRoutes');

const connectDB = require('./config/db');
const app = express();

// Middleware for logging requests (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// CORS setup
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);
app.use("/details", inforDetails);
app.use("/payment", paymentDetails);
app.use('/tokens', Passcode);
app.use('/orders', OrderMake);

app.use('/api', productRoutes);

// Check if MONGO_ADDRESS is provided
const MongoAddress = process.env.MONGO_ADDRESS;

if (!MongoAddress) {
  console.error("MongoDB address not provided");
  process.exit(1);
}

// Call the function to connect to DB
connectDB();

// Start the server after DB connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
