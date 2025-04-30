import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../../hook/useAuthContext";
import { useUserInformation } from "../../hook/useUserInfor";

const PaymentPopup = ({ onClose, onSuccessfulPurchase, paymentData }) => {
  const { dispatch } = useUserInformation();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const isEditing = !!paymentData; // Check if updating existing data

  const [formData, setFormData] = useState({
    bank: "",
    branch: "",
    cNumber: "",
    cardType: "",
    owner: "",
    expiryDate: "",
    cnn:""
  });

  // Prefill form when editing
  useEffect(() => {
    if (paymentData) {
      setFormData({
        bank: paymentData.bank || "",
        branch: paymentData.branch || "",
        cNumber: paymentData.cNumber || "",
        cardType: paymentData.cardType || "",
        owner: paymentData.owner || "",
        expiryDate: paymentData.expiryDate || "",
        cnn:paymentData.cnn ||"123"
      });
    }
  }, [paymentData]);

  console.log("payment data",formData)

  const handleCarNumberFunction = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1-").replace(/-$/, "");
    setFormData((prev) => ({ ...prev, cNumber: formattedValue }));
  };

  console.log("user id form pop up update ",user.user.id)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
    if (emptyFields.length > 0) {
      setError("Please fill in all fields.");
      setEmptyFields(emptyFields);
      return;
    }
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_FRONT_END_API_URL}/payment/${isEditing ? `updateOne/${user.user.id}` : "add"}`,
        {
          method: isEditing ? "PUT" : "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
  
      const text = await response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (err) {
        console.error("Invalid JSON response:", text);
        throw new Error(`Unexpected response format: ${response.status} ${response.statusText}`);
      }
  
      if (!response.ok) {
        setError(json.error || `Error: ${response.status} - ${response.statusText}`);
        setEmptyFields(json.emptyFields || []);
      } else {
        setTimeout(() => {
          onSuccessfulPurchase();
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isEditing ? "Update Payment Details" : "Add Payment Details"}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 transition">
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="bank" placeholder="Bank Name" value={formData.bank} onChange={handleChange} className="p-3 border rounded-lg focus:ring focus:ring-blue-300" required />
            <input type="text" name="branch" placeholder="Branch Name" value={formData.branch} onChange={handleChange} className="p-3 border rounded-lg focus:ring focus:ring-blue-300" required />
            <input type="text" name="cNumber" placeholder="Card Number" value={formData.cNumber} onChange={handleCarNumberFunction} className="p-3 border rounded-lg focus:ring focus:ring-blue-300" required maxLength="19" />
            <input type="text" name="cardType" placeholder="Card Type" value={formData.cardType} onChange={handleChange} className="p-3 border rounded-lg focus:ring focus:ring-blue-300" required />
            <input type="text" name="owner" placeholder="Card Owner" value={formData.owner} onChange={handleChange} className="p-3 border rounded-lg focus:ring focus:ring-blue-300" required />
            <input type="text" name="expiryDate" placeholder="Expiry Date" value={formData.expiryDate} onChange={handleChange} className="p-3 border rounded-lg focus:ring focus:ring-blue-300" required />
            <input type="text" name="cnn" placeholder="CNN" value={formData.cnn} onChange={handleChange} className="p-3 border rounded-lg focus:ring focus:ring-blue-300" required />
  
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600">
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PaymentPopup;
