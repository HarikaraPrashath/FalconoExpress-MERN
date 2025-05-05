import React, { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { FaBookmark, FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { SiTrustpilot } from "react-icons/si";

const Paymentad = () => {
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 mt-1">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-red-500 to-red-900 text-white p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <AiFillHome className="text-2xl" />
            <h1 className="text-2xl font-bold tracking-wide">Dashboard</h1>
          </div>
          <div className="flex flex-col items-center text-center mb-6">
            <img
              src="https://images.pexels.com/photos/9461230/pexels-photo-9461230.jpeg"
              alt="User"
              className="rounded-full w-20 h-20 border-2 border-white mb-2"
            />
            <p className="text-lg font-semibold">Admin</p>
            <p className="text-sm"> Admin@gmail.com</p>
          </div>
          <nav className="space-y-4">
            <Link
              to={`/adminOrder`}
              className="flex items-center space-x-2 w-full text-left p-2  hover:bg-white hover:text-red-600 rounded"
            >
              <FaBookmark className="text-xl" />
              <span>Orders</span>
            </Link>
            <Link
              to={`/custonerdelivery`}
              className="flex items-center space-x-2 w-full text-left p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <IoIosInformationCircle className="text-xl" />
              <span>Customer Delivery</span>
            </Link>
            <Link
              to={`/paymentad`}
              className="flex items-center space-x-2 w-full text-left p-2 bg-white text-red-600 rounded"
            >
              <MdOutlinePayment className="text-xl" />
              <span>Payment</span>
            </Link>

            <Link
              to={`/revenue`}
              className="flex items-center space-x-2 w-full text-left p-2   hover:bg-white hover:text-red-600 rounded"
            >
              <BiSolidOffer className="text-xl" />
              <span>Revenue Infor</span>
            </Link>
            <Link
              to={`/loyalty`}
              className="flex items-center space-x-2 w-full text-left p-2   hover:bg-white hover:text-red-600 rounded"
            >
              <SiTrustpilot className="text-xl" />
              <span>Loyalty Infor</span>
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
        {/* Search Bar */}
        <SearchBar />
      </div>
    </div>
  );
};

export default Paymentad;
