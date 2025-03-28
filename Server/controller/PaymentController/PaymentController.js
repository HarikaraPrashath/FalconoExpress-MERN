const mongoose = require('mongoose');
const Payment = require("../../models/PaymentModel/PaymentModel");

//add new product
const addPayment = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug log to inspect incoming data

    const { bank, branch, cNumber, cardType, owner, expiryDate } = req.body;
    const user_id = req.user._id; // Assuming middleware sets req.user

    if (!user_id) {
      return res.status(400).json({ error: "User ID not found in request" });
    }
    console.log("user_id", user_id);
    const payment = new Payment({
      bank,
      branch,
      cNumber,
      cardType,
      owner,
      expiryDate,
      user_id,
    });
    await payment.save();

    res.status(201).json({ success: true, payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//fetch product
const fetchPayment = async (req, res) => {
  try {
    const listOfPayment = await Payment.find({});
    res.status(200).json({
      success: true,
      data: listOfPayment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error while fetching data",
    });
  }
};

//ready product by id
const getOneDetails = async (req, res) => {
  try {
      const { id } = req.params; // Extract user_id from request parameters
      console.log(id, "user_id from request");

      // Find all payments associated with the given user_id
      const oneDetails = await Payment.find({ user_id: id });

      if (oneDetails.length === 0) {
          return res.status(404).json({ message: "No details found" });
      }

      res.json({ message: "Details found", data: oneDetails });
  } catch (error) {
      console.error("Error fetching details:", error);
      res.status(500).json({ message: "Failed to fetch details" });
  }
};

//update form using ID
const updatePaymentById = async (req, res) => {
  const { id } = req.params; // Extract user_id from request parameters
  const { bank, branch, cNumber, cardType, owner, expiryDate } = req.body;

  try {
    // Find and update payment details based on user_id
    const updatedPayment = await Payment.findOneAndUpdate(
      { user_id: id }, // Find payment record by user_id
      { bank, branch, cNumber, cardType, owner, expiryDate },
      { new: true } // Return the updated document
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Details not found" });
    }

    res.json({ message: "Details updated successfully", data: updatedPayment });
  } catch (error) {
    console.error("Error updating details:", error);
    res.status(500).json({ message: "Failed to update details" });
  }
};


//delete product
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);

    if (!payment)
      return res.status(404).json({
        success: false,
        message: "Not got the Payment",
      });

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error happened",
    });
  }
};

module.exports = {
  addPayment,
  deletePayment,
  fetchPayment,
  updatePaymentById,
  getOneDetails,
};
