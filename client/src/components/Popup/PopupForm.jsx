import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../../hook/useAuthContext";
import { useUserInformation } from "../../hook/useUserInfor";


const PopupForm = ({ onClose, onSuccessfulPurchase }) => {
  const {dispatch}  = useUserInformation();
  const {user} = useAuthContext();
  const [error,setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    street: "",
    area: "",
    number: "",
    postalCode: "",
    landMark: "",
    bank: "",
    branch: "",
    cNumber: "",
    cardType: "",
    owner: "",
    expiryDate: "",
  });

  const handleCarNumberFunction = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16); // Remove non-digits and limit to 16
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1-"); // Format as xxxx-xxxx-xxxx-xxxx
    setFormData({ ...formData, cNumber: formattedValue }); // add formatted value with formData
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const response = await fetch("",{
      method:"POST",
      body:JSON.stringify(formData),
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${user?.token}`,
      }
    })

    const json = await response.json()

    if(!response){
      setError(json.error)
      setEmptyFields(json.emptyFields || []);

    }
    else{
     console.log(formData)
     dispatch({ type: "CREATE_ORDER", payload: json });
    }
    setTimeout(() => {
      // Simulate successful payment
      onSuccessfulPurchase(); // Notify parent component of successful purchase
      onClose(); // Close the popup
    }, 1000); // Simulate network delay
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
          <h2 className="text-2xl font-semibold text-gray-800">Order Form</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Personal Info */}
          <h3 className="text-lg font-medium text-gray-700">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Address Info */}
          <h3 className="text-lg font-medium text-gray-700">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={formData.area}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="number"
              placeholder="House/Apartment No."
              value={formData.number}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="number"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Payment Info */}
          <h3 className="text-lg font-medium text-gray-700">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="bank"
              placeholder="Bank Name"
              value={formData.bank}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch Name"
              value={formData.branch}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="cNumber"
              placeholder="Card Number"
              value={formData.cNumber}
              onChange={handleCarNumberFunction}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="cardType"
              placeholder="Card Type (Visa/MasterCard)"
              value={formData.cardType}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="owner"
              placeholder="Cardholder's Name"
              value={formData.owner}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiration Date (MM/YY)"
              value={formData.expiryDate}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gradient-to-r from-gray-500 to-gray-900 text-white px-6 py-2 rounded-full hover:from-gray-600 hover:to-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PopupForm;
