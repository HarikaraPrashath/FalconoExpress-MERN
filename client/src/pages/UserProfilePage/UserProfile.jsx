import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { FaBookmark, FaPencilAlt, FaTrash } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import PaymentPopup from "../../components/PaymentModelForPopUp/PaymentPopup";
import PopUpForOrderMakeUser from "../../components/PopUpForOrderMakeUser/PopUpForOrderMakeUser";

const UserProfile = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPayment = (orderId) => {
    setSelectedOrder(orderId);
    setShowPaymentModal(true);
  };

  const handleClosePayment = () => {
    setSelectedOrder(null);
    setShowPaymentModal(false);
  };

  const logoutUser = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  const statusOfShow = "Pay for Order"; // Set the status value here

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
              className="flex items-center space-x-2 w-full text-left p-2 bg-white text-red-600 rounded"
            >
              <FaBookmark className="text-xl" />
              <span>Orders</span>
            </Link>
            <Link
              to={`/information/${id}`}
              className="flex items-center space-x-2 w-full text-left p-2 hover:bg-white hover:text-red-600 rounded"
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
            <button
              onClick={logoutUser}
              className="flex items-center space-x-3 w-full text-left p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <IoLogOut className="text-xl" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Search Bar */}
        <SearchBar />
        <div className="flex justify-end mt-10">
          <button
            onClick={() => setShowPopup(true)}
            className="flex bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300"
          >
            Make Order
          </button>
        </div>

        {showPopup && (
          <PopUpForOrderMakeUser onClose={() => setShowPopup(false)} />
        )}

        {/* Orders Table */}
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">98eqwihs879</td>
                <td className="p-3">john@example.com</td>
                <td className="p-3">123-456-7890</td>
                <td className="p-3">2025-01-02</td>
                <td className="p-3 text-yellow-500">{statusOfShow}</td>
                {/* Set the status value here */}
                {(() => {
                  const status = statusOfShow;

                  return (
                    <td className="p-3 flex items-center space-x-3">
                      {status === "Pay for Order" ? (
                        <button
                          onClick={() => handleOpenPayment("98eqwihs879")}
                          className="text-yellow-600 hover:text-yellow-800 border px-2 py-1 rounded"
                        >
                          Pay
                        </button>
                      ) : (
                        <>
                          <button className="text-blue-500 hover:text-blue-700">
                            <FaPencilAlt />
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </td>
                  );
                })()}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentPopup
        showPaymentModal={showPaymentModal}
        selectedOrder={selectedOrder}
        closeModal={handleClosePayment}
      />
    </div>
  );
};

export default UserProfile;
