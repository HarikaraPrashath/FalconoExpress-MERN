import React, { useState,useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { FaBookmark, FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import PopupForm from "../../components/Popup/PaymentPopUp";

const Payment = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [showPopUp, setShowPopUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [paymentForUser, setPaymentForUser] = useState([]);


console.log("User session Details form Payment Page and pop up ",user)

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  //success message show
  const handleSuccess = () => {
    setShowPopUp(false);
    setSuccessMessage("successfully Add Payment Details");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };


  console.log("user",user)
  console.log("user token",user.token)
  console.log("user _ id",user.user.id)

  //fetching all product base on user
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user || !user.token || !user.user.id) {
        console.error("No user, token, or user ID available");
        return;
      }
  
      try {
        const response = await fetch(
          `${import.meta.env.VITE_FRONT_END_API_URL}/payment/getOne/${user.user.id}`, // Pass the user ID
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(
          "Authorization Header inside the useEffect:",
          `Bearer ${user.token}`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        setPaymentForUser(data.data); // Assuming `data.data` contains the payments
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchWorkouts();
  }, [user]);
  
console.log(paymentForUser)

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 mt-1">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-red-500 to-red-900 text-white p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <AiFillHome className="text-xl" />
            <h1 className="text-xl font-semibold">Home</h1>
          </div>
          <div className="flex flex-col items-center text-center mb-6">
            <img
              src="https://images.pexels.com/photos/9461230/pexels-photo-9461230.jpeg"
              alt="User"
              className="rounded-full w-20 h-20 border-2 border-white mb-2"
            />
            <p className="text-lg font-semibold">{user.user.username}</p>
            <p className="text-sm">{user.user.email}</p>
          </div>
          <nav className="space-y-4">
            <Link
              to={`/userprofile/${id}`}
              className="flex items-center space-x-2 p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <FaBookmark className="text-xl" />
              <span>Orders</span>
            </Link>
            <Link
              to={`/information/${id}`}
              className="flex items-center space-x-2 p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <IoIosInformationCircle className="text-xl" />
              <span>Information</span>
            </Link>
            <Link
              to={`/payment/${id}`}
              className="flex items-center space-x-2 p-2 bg-white text-red-600 rounded"
            >
              <MdOutlinePayment className="text-xl" />
              <span>Payment</span>
            </Link>
            <Link
              to={`/promotion/${id}`}
              className="flex items-center space-x-2 p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <BiSolidOffer className="text-xl" />
              <span>Promotion</span>
            </Link>
            <Link
              onClick={logoutUser}
              className="flex items-center space-x-3 p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <IoLogOut className="text-xl" />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Search Bar */}
        <SearchBar />

        {/* Payment Details Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            My Payment Details
          </h2>
          <button
            onClick={() => setShowPopUp(true)}
            className="mb-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full transition-colors"
          >
            Add Card
          </button>
          {successMessage && (
              <div className="mt-4 p-4 bg-red-600 text-white rounded-lg text-center">
                {successMessage}
              </div>
            )}

            {showPopUp && (
            <div
              className="popup-overlay"
              onClick={() => setShowPopUp(false)} // Close on clicking the overlay
            >
              <div
                className="popup-content"
                onClick={(e) => e.stopPropagation()} // Stop click propagation on popup content
              >
                <PopupForm
                  onClose={() => setShowPopUp(false)}
                  onSuccessfulPurchase={handleSuccess}
                />
              </div>
            </div>
          )}

          {/* Payment Card */}
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="bg-white  rounded-xl shadow-lg p-6 mb-6 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Card {index + 1}
                </h3>
                <div className="flex space-x-2">
                  <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    <FaPencilAlt />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <p className="text-gray-600">
                  <span className="text-green-500 font-semibold">
                    Bank Name:
                  </span>{" "}
                  ABC Bank
                </p>
                <p className="text-gray-600">
                  <span className="text-green-500 font-semibold">Branch:</span>{" "}
                  Colombo 7
                </p>
                <p className="text-gray-600">
                  <span className="text-green-500 font-semibold">
                    Card Type:
                  </span>{" "}
                  Master
                </p>
                <p className="text-gray-600">
                  <span className="text-green-500 font-semibold">
                    Card Number:
                  </span>{" "}
                  **** **** **** 4125
                </p>
                <p className="text-gray-600">
                  <span className="text-green-500 font-semibold">Owner:</span>{" "}
                  User 1
                </p>
                <p className="text-gray-600">
                  <span className="text-green-500 font-semibold">
                    Expiry Date:
                  </span>{" "}
                  12/26
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
