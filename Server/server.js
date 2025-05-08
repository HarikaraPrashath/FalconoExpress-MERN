require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Initialize app
const authRouter = require("./routes/AuthRoute/AuthRoute");
const inforDetails = require("./routes/DetailsRoutes/detailsRoute");
const paymentDetails = require("./routes/PaymentRotes/PaymentRoute");


















const orderDelivery = require("./routes/OrderRoutes/orderRoutes");
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
const authRouter = require("./routes/AuthRoute/AuthRoute");
const inforDetails = require("./routes/DetailsRoutes/detailsRoute");
const paymentDetails = require("./routes/PaymentRotes/PaymentRoute");
const chatbotRoutes = require("./routes/ChatBoxRoute/chatbot");
const orderDelivery = require("./routes/OrderRoutes/orderRoutes");

app.use("/auth", authRouter);
app.use("/details", inforDetails);
app.use("/payment", paymentDetails);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/orders", orderDelivery);

// Test Route
app.get("/", (req, res) => res.send("API running"));

// Database Connection








app.use("/api/orders", orderDelivery);
//checking database connection
const MongoAddress = process.env.MONGO_ADDRESS;

if (!MongoAddress) {
  console.error("MongoDB address not provided");
  process.exit(1);
}

//database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ADDRESS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");

    // Start the server after successful DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

// Check MongoDB URI and connect
if (!process.env.MONGO_ADDRESS) {
  console.error("MongoDB address not provided in .env");
  process.exit(1);
}

connectDB();