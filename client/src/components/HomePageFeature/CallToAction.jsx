import React from "react";

const CallToAction = () => {
  return (
    <div className=" text-black py-16 flex flex-col md:flex-row items-center justify-between px-10 max-w-6xl mx-auto rounded-lg shadow-lg">
      {/* Text Section */}
      <div className="md:w-2/3 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg md:text-xl mb-4">
          Join thousands of businesses that trust <span className="font-semibold">SwiftShip</span> for their delivery needs.
        </p>
        <p className="text-sm text-black">No credit card required. Start shipping in minutes.</p>
      </div>

      {/* Buttons Section */}
      <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-4">
        <button className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition">
          Sign Up Now
        </button>
        <button className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition">
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
