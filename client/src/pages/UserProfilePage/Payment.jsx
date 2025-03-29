import React, { useState, useEffect } from "react";
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
import PopupFormUpdate from "../../components/Popup/PaymentPopUpUpdate";
import CreditCard from "../../components/CardBank/CreditCard";

const Payment = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [paymentForUser, setPaymentForUser] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setShowUpdatePopup(true);
  };

  const handleSuccess = () => {
    setShowAddPopup(false);
    setSuccessMessage("Successfully added payment details!");
    setTimeout(() => setSuccessMessage(""), 3000);
    fetchPayments();
  };

  const fetchPayments = async () => {
    if (!user || !user.token || !user.user.id) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_FRONT_END_API_URL}/payment/getOne/${user.user.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setPaymentForUser(data.data || []);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_FRONT_END_API_URL}/payment/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      console.log("Payment deleted successfully");
      fetchPayments();
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

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
            <p className="text-lg font-semibold">{user?.user?.username}</p>
            <p className="text-sm">{user?.user?.email}</p>
          </div>
          <nav className="space-y-4">
            <Link to={`/userprofile/${id}`} className="flex items-center space-x-2 p-2 hover:bg-white hover:text-red-600 rounded">
              <FaBookmark className="text-xl" />
              <span>Orders</span>
            </Link>
            <Link to={`/information/${id}`} className="flex items-center space-x-2 p-2 hover:bg-white hover:text-red-600 rounded">
              <IoIosInformationCircle className="text-xl" />
              <span>Information</span>
            </Link>
            <Link to={`/payment/${id}`} className="flex items-center space-x-2 p-2 bg-white text-red-600 rounded">
              <MdOutlinePayment className="text-xl" />
              <span>Payment</span>
            </Link>
            <Link to={`/promotion/${id}`} className="flex items-center space-x-2 p-2 hover:bg-white hover:text-red-600 rounded">
              <BiSolidOffer className="text-xl" />
              <span>Promotion</span>
            </Link>
            <Link onClick={logoutUser} className="flex items-center space-x-3 p-2 hover:bg-white hover:text-red-600 rounded">
              <IoLogOut className="text-xl" />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <SearchBar />
        <div className="max-w-4xl mx-auto mt-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">My Payment Details</h2>

  <button
    onClick={() => setShowAddPopup(true)}
    className="mb-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full"
  >
    Add Card
  </button>

  {successMessage && (
    <div className="mt-4 p-4 bg-blue-600 text-white rounded-lg text-center">
      {successMessage}
    </div>
  )}

  {showAddPopup && (
    <PopupForm onClose={() => setShowAddPopup(false)} onSuccessfulPurchase={handleSuccess} />
  )}

  {paymentForUser.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {paymentForUser.map((card, index) => (
        <div
          key={card._id}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-300 hover:shadow-xl transition-all"
        >
        <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(card)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDelete(card._id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          {/* Credit Card Component */}
          <div className="w-full">
            <CreditCard
              bankCard={card.bank}
              branch={card.branch}
              cardType={card.cardType}
              cNumber={card.cNumber}
              owner={card.owner}
              expiryDate={card.expiryDate}
              cnn={card.cnn}
            />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600 text-center py-4">No payment details found.</p>
  )}

  {showUpdatePopup && (
    <PopupFormUpdate onSuccessfulPurchase={handleSuccess} onClose={() => setShowUpdatePopup(false)} paymentData={selectedPayment} />
  )}
</div>


      </div>
    </div>
  );
};

export default Payment;
