import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { FaBookmark, FaEdit, FaSearch } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import PopupForm from "../../components/Popup/PopupForm";

const Information = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [showPopUp, setShowPopUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  //function which is going to be handle popUp

  const handleSuccess = () => {
    setShowPopUp(false);
    setSuccessMessage("successfully Add Personal Details");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-gray-100 mt-1">
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
              className="flex items-center space-x-2 w-full text-left p-2  hover:bg-white hover:text-red-600 rounded"
            >
              <FaBookmark className="text-xl" />
              <span>Orders</span>
            </Link>
            <Link
              to={`/information/${id}`}
              className="flex items-center space-x-2 w-full text-left p-2 bg-white text-red-600  rounded"
            >
              <IoIosInformationCircle className="text-xl" />
              <span>Information</span>
            </Link>
            <Link
              to={`/payment/${id}`}
              className="flex items-center space-x-2 w-full text-left p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <MdOutlinePayment className="text-xl" />
              <span>Payment</span>
            </Link>

            <Link
              to={`/promotion/${id}`}
              className="flex items-center space-x-2 w-full text-left p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <BiSolidOffer className="text-xl" />
              <span>Promotion</span>
            </Link>
            <Link
              onClick={logoutUser}
              className="flex items-center space-x-3 w-full text-left p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <IoLogOut className="text-xl" />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <SearchBar />

        {/* Table */}
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3">
            <div className="flex flex-col items-center">
              <img
                src="https://images.pexels.com/photos/9461230/pexels-photo-9461230.jpeg"
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">Sami Rahman</h2>
              <p className="text-gray-500 text-sm">
                Customer Role: Premium User
              </p>
              <p className="text-gray-500 text-sm">Last Login: 07 Aug 2018</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-700 font-semibold">Mobile Number:</p>
              <p className="text-gray-700">+1-856-869-909-1238</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-700 font-semibold">Email:</p>
              <p className="text-gray-500">samirahman002@gmail.com</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-700 font-semibold">Location Details:</p>
              <p className="text-gray-700">
                <span className="font-semibold">Street:</span> 45A Elm Street
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Area:</span> Downtown
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Number:</span> 12B
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Postal Code:</span> 10001
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Landmark:</span> Near City Mall
              </p>
            </div>

            {/* This is for trigger the popup function  */}
            <div className="mt-6">
              <div className="flex mt-3">
                <button
                  onClick={() => setShowPopUp(true)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Profile Update
                </button>
              </div>
            </div>
            {successMessage && (
              <div className="mt-4 p-4 bg-red-600 text-white rounded-lg text-center">
                {successMessage}
              </div>
            )}
          </div>

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

          {/* Account & Bills Section */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            {/* xPay Accounts */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">My Payment Details</h3>
                <div className="flex items-center gap-3">
                  <FaSearch className="text-gray-400 cursor-pointer" />
                  <button className="text-gray-600">
                    <FaEdit />
                  </button>
                </div>
              </div>
              <div className="mt-4">
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

            {/* My Bills */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold">324234sdfd</span>
                  <span className="text-gray-500">123-13-3</span>
                  <span className="bg-green-500 text-white px-3 py-1 text-xs rounded-full">
                    Delivered
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">324234sdfd</span>
                  <span className="text-gray-500">123-13-3</span>
                  <span className="bg-red-500 text-white px-3 py-1 text-xs rounded-full">
                    Not delivered
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">324234sdfd</span>
                  <span className="text-gray-500">123-13-3</span>
                  <span className="bg-green-500 text-white px-3 py-1 text-xs rounded-full">
                    Delivered
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
