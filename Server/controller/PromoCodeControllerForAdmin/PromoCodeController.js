const Token = require("../../models/PromoCodeModel/PromoCode.js");

// CREATE: Add new token
const createToken = async (req, res) => {
  try {
    const { token, adminEmail, purpose, expiryDate, discount } = req.body;

    const newToken = new Token({
      token,
      adminEmail,
      purpose,
      expiryDate,
      discount,
    });

    await newToken.save();
    res
      .status(201)
      .json({ message: "Token created successfully", token: newToken });
  } catch (error) {
    console.error("Token creation error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create token", error: error.message });
  }
};

// READ: Get all tokens
const getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.find();
    res.status(200).json(tokens);
  } catch (error) {
    console.error("Error fetching tokens:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch tokens", error: error.message });
  }
};

// READ: Get a specific token by ID
const getTokenById = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }
    res.status(200).json(token);
  } catch (error) {
    console.error("Error fetching token:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch token", error: error.message });
  }
};

// UPDATE: Update a token by ID
const updateToken = async (req, res) => {
  try {
    const updatedToken = await Token.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedToken) {
      return res.status(404).json({ message: "Token not found" });
    }
    res
      .status(200)
      .json({ message: "Token updated successfully", token: updatedToken });
  } catch (error) {
    console.error("Error updating token:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update token", error: error.message });
  }
};

// DELETE: Delete a token by ID
const deleteToken = async (req, res) => {
  try {
    const deletedToken = await Token.findByIdAndDelete(req.params.id);
    if (!deletedToken) {
      return res.status(404).json({ message: "Token not found" });
    }
    res.status(200).json({ message: "Token deleted successfully" });
  } catch (error) {
    console.error("Error deleting token:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete token", error: error.message });
  }
};

module.exports = {
  createToken,
  deleteToken,
  getAllTokens,
  getTokenById,
  updateToken,
};
