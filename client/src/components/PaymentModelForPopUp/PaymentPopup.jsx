import React, { useEffect, useState } from "react";
import CarbonFootprintCalculator from "../CarbonFootprintCalculator/CarbonFootprintCalculator";
import axios from "axios";

const PaymentPopup = ({ showPaymentModal, selectedOrder, closeModal }) => {
  if (!showPaymentModal) return null;

  const [amount, setAmount] = useState("");
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const [discountedAmount, setDiscountedAmount] = useState("");
  const [error, setError] = useState("");
  const km = 150;

  // Fetch all promo codes when modal is shown
  // useEffect(() => {
  //   const fetchPromoCodes = async () => {
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_FRONT_END_API_URL}/tokens/getAll`);
  //       const data = await response.json();
  //       console.log("data", data); // This should print the array correctly
  //       setPromoCodes(data); // ✅ Set directly, since response is already an array
  //     } catch (error) {
  //       console.error('Failed to fetch promo codes:', error.message);
  //     }
  //   };

  //   if (showPaymentModal) {
  //     fetchPromoCodes();
  //   }
  // }, [showPaymentModal]);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_FRONT_END_API_URL}/tokens/getAll`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setPromoCodes(data);
      } catch (error) {
        console.error("Failed to fetch promo codes:", error.message);
      }
    };

    if (showPaymentModal) {
      fetchPromoCodes();
    }
  }, [showPaymentModal]);


  //searching the code 
  const applyPromoCode = async () => {
    for (let i = 0; i < promoCodes.length; i++) {
      const code = promoCodes[i];

      console.log(
        `Checking promoCodes[${i}] -> Token: ${code.token}, Discount: ${code.discount}, Expiry: ${code.expiryDate}, isUsed: ${code.isUsed}`
      );

      const isTokenMatch =
        code.token.toLowerCase() === promoCodeInput.toLowerCase();
      const isNotUsed = !code.isUsed;
      const isNotExpired = new Date(code.expiryDate) > new Date();

      if (isTokenMatch && isNotUsed && isNotExpired) {
        const discountValue = parseFloat(code.discount.replace("%", ""));
        const discountAmount = (parseFloat(amount) * discountValue) / 100;
        const newAmount = parseFloat(amount) - discountAmount;

        console.log(`✅ Promo code matched at index ${i}`);
        console.log(`Discount value: ${discountValue}%`);
        console.log(`Amount before discount: ${amount}`);
        console.log(`Discounted amount: ${newAmount}`);

        setDiscountedAmount(newAmount);
        setError("");

        // Optional: disable promo in DB
        try {
          await fetch(`/api/tokens/disable/${code._id}`, {
            method: "PUT",
          });
        } catch (err) {
          console.error("Failed to disable promo code:", err.message);
        }

        return; // exit after first valid promo is found and applied
      }
    }

    // If no matching promo code found
    setError("Invalid or expired promo code");
  };

  // Handle payment submission
  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Payment submitted");
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
        <h2 className="text-xl font-bold mb-4 text-red-600">Pay for Order</h2>
        <p>Order ID: {selectedOrder}</p>

        <form className="space-y-4 mt-4" onSubmit={handlePayment}>
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Expiry Date"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Card Type"
            className="w-full p-2 border rounded"
          />

          {/* Carbon Footprint Section */}
          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Carbon Footprint (EV)
            </h3>
            <CarbonFootprintCalculator km={km} />
          </div>

          {/* Promo Code Section */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Promo Code"
              className="w-full p-2 border rounded"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
            />
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-2"
              onClick={applyPromoCode}
            >
              Apply Promo Code
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Discounted Amount */}
          {discountedAmount && (
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Total after Discount: Rs {discountedAmount.toFixed(2)}
              </p>
            </div>
          )}

          <input
            type="text"
            placeholder="Bill Send Mail Address"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Pay Now
          </button>
        </form>

        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
