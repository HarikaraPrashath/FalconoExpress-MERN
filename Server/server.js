require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRouter = require("./routes/AuthRoute/AuthRoute");
const inforDetails = require("./routes/DetailsRoutes/detailsRoute");
const paymentDetails = require("./routes/PaymentRotes/PaymentRoute");



















const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/details", inforDetails);
app.use("/payment", paymentDetails);








//checking database connection
const MongoAddress = process.env.MONGO_ADDRESS;

if (!MongoAddress) {
  console.error("MongoDB address not provided");
  process.exit(1);
}

//database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ADDRESS);

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

// Call the function to connect to DB
connectDB();
