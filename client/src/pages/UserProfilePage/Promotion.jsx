import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";
import SearchBar from "../../components/SearchBar/SearchBar";

const Promotion = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/";
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
              className="flex items-center space-x-2 w-full text-left p-2  bg-white text-red-600  rounded"
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
        {/* Search Bar */}
        <SearchBar/>

        {/* Table */}
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">ReferenceNum</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">John Doe</td>
                <td className="p-3">john@example.com</td>
                <td className="p-3">123-456-7890</td>
                <td className="p-3">#REF12345</td>
                <td className="p-3 text-green-500">Pending</td>
                <td className="p-3 flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaPencilAlt />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
