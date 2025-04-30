import React from 'react';
import deliveryImage from '../../assets/Images/smartphone-with-delivery-worker-using-face-mask-in-motorcycle-free-vector.jpg';
import dashboardImg from '../../assets/Images/online-delivery-service-concept-expression-of-couriers-delivering-parcels-to-customers-flat-style-cartoon-illustration-vector.jpg';
import dashboardImg1 from '../../assets/Images/6199.png_860.png';
import mapImg from '../../assets/Images/istockphoto-1403924060-612x612.jpg';
import mapImg1 from '../../assets/Images/istockphoto-1259533063-612x612.jpg';

const Overview = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <section className="flex flex-col items-center text-center p-8 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-semibold">Intelligent Delivery Management</h2>
        <p className="max-w-md text-lg mt-4 mb-6">
          Start your 14-day free trial and get the cutting-edge technology to rapidly scale up and optimize your last mile operations.
        </p>
        <button className="bg-white text-red-500 hover:bg-blue-100 text-lg px-6 py-3 rounded-full transition duration-300">
          Get Free Trial
        </button>
        <img src={deliveryImage} alt="Delivery" className="w-72 h-auto mt-8 rounded-lg shadow-xl" />
      </section>

      {/* How it Works Section */}
      <section className="text-center px-4 py-12 bg-gray-50">
        <h3 className="text-2xl font-semibold mb-6">How Falcon Express Simply Works?</h3>

        <div className="flex justify-center gap-8 mb-10 flex-wrap">
          <img src={dashboardImg} alt="Dashboard" className="w-72 border-2 border-blue-400 rounded-lg shadow-md hover:scale-105 transition transform duration-300" />
          <img src={dashboardImg1} alt="Mobile" className="w-40 border-2 border-blue-400 rounded-lg shadow-md hover:scale-105 transition transform duration-300" />
        </div>

        {/* Features List */}
        <ul className="text-left max-w-xl mx-auto space-y-5 text-lg">
          {[
            'Dashboard – single task creation/bulk upload',
            'Custom booking forms',
            'Ordering platforms/POS/API',
            'Automated task assignment',
            'Task Self-Assignment',
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-500 text-2xl mr-3 mt-1">🔴</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Map Section */}
        <div className="flex justify-center mt-12 gap-8 flex-wrap">
          <img src={mapImg} alt="Map View" className="w-72 border-2 border-teal-500 rounded-lg shadow-md hover:scale-105 transition transform duration-300" />
          <img src={mapImg1} alt="Route View" className="w-40 border-2 border-teal-500 rounded-lg shadow-md hover:scale-105 transition transform duration-300" />
        </div>
      </section>
    </div>
  );
};

export default Overview;
