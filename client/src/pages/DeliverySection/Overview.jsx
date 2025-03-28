import React from 'react';
import deliveryImage from '../../assets/Images/1840_SkVNQSBHRVIgMTAxNy0yOA.jpg'; // Replace with your actual image path
import dashboardImg from '../../assets/Images/online-delivery-service-concept-expression-of-couriers-delivering-parcels-to-customers-flat-style-cartoon-illustration-vector.jpg';
import mapImg from '../../assets/Images/delivery-worker-character-illustration-happy-female-courier-holding-parcel-box-fast-online-delivery-service-vector.jpg';

const Overview = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <section className="flex flex-col items-center text-center p-6 space-y-4">
        <h2 className="text-xl font-semibold">Intelligent Delivery Management</h2>
        <p className="max-w-md text-sm">
          Start your 14-day free trial and get the cutting-edge technology to rapidly scale up and optimize your last mile operations.
        </p>
        <button className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded">
          Get Free Trial
        </button>
        <img src={deliveryImage} alt="Delivery" className="w-60 rounded" />
      </section>

      {/* How it Works Section */}
      <section className="text-center px-4 py-8">
        <h3 className="text-lg font-semibold mb-4">How Falcon Express Simply Works?</h3>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <img src={dashboardImg} alt="Dashboard" className="w-60 border rounded" />
          <img src={dashboardImg} alt="Mobile" className="w-32 border rounded" />
        </div>

        {/* Features List */}
        <ul className="text-left max-w-md mx-auto space-y-3 text-sm">
          {[
            'Dashboard – single task creation/bulk upload',
            'Custom booking forms',
            'Ordering platforms/POS/API',
            'Automated task assignment',
            'Task Self-Assignment',
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-500 text-lg mr-2 mt-1">🔴</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Map Section */}
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          <img src={mapImg} alt="Map View" className="w-60 border rounded" />
          <img src={mapImg} alt="Route View" className="w-32 border rounded" />
        </div>
      </section>
    </div>
  );
};

export default Overview;