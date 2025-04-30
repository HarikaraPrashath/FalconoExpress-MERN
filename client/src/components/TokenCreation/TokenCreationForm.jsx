import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // For unique token generation

const TokenCreationForm = ({ onClose }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [generatedToken, setGeneratedToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = uuidv4().split("-")[0].toUpperCase(); // Shortened UUID
  
    const formData = {
      token,
      adminEmail,
      purpose,
      expiryDate,
      discount: `${discount}%`,
    };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_FRONT_END_API_URL}/tokens/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create token");
      }
  
      const result = await response.json();
      console.log("Server response:", result);
  
      setGeneratedToken(formData); // update state after successful submission
    } catch (error) {
      console.error("Error submitting token data:", error.message);
    }
  };
  

  return (
    <div className="fixed inset-2 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Generate Admin Token</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
        </div>

        {!generatedToken ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Purpose</label>
              <input
                type="text"
                required
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="e.g. Promo settings"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Expiry Date</label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Discount (%)</label>
              <input
                type="number"
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="e.g. 10"
                min="1"
                max="100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 rounded-full font-semibold hover:from-red-700 hover:to-pink-700 transition-all"
            >
              Generate Token
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-bold text-green-700">Token Created Successfully!</h3>
            <p><strong>Token:</strong> <code className="text-blue-600">{generatedToken.token}</code></p>
            <p><strong>Discount:</strong> {generatedToken.discount}</p>
            <p><strong>Expires on:</strong> {generatedToken.expiryDate}</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenCreationForm;
