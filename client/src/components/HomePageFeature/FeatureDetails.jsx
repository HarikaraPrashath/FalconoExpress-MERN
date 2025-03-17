import React from "react";
import { FaGlobe, FaShippingFast, FaShieldAlt, FaClock, FaMapMarkedAlt, FaBoxOpen } from "react-icons/fa";

const Feature = () => {
  return (
    <div className=" py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature Item */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaGlobe className="text-4xl text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-700">National Delivery</h3>
            <p className="text-gray-600 mt-2">Delivery to over 200 City with competitive rates and reliable service.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaShippingFast className="text-4xl text-green-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-700">Real-time Tracking</h3>
            <p className="text-gray-600 mt-2">Monitor your shipments in real-time with detailed status updates.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaShieldAlt className="text-4xl text-red-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-700">Secure Deliver</h3>
            <p className="text-gray-600 mt-2">Your packages are insured and handled with the utmost care.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaClock className="text-4xl text-yellow-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-700">Urgent Shipments</h3>
            <p className="text-gray-600 mt-2">Urgent shipments delivered on the same day within city limits.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaMapMarkedAlt className="text-4xl text-purple-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-700">Address Verification</h3>
            <p className="text-gray-600 mt-2">Consider address verification to ensure accurate delivery.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaBoxOpen className="text-4xl text-indigo-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-700">Custom Packaging</h3>
            <p className="text-gray-600 mt-2">Tailored packaging solutions for items of all shapes and sizes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
