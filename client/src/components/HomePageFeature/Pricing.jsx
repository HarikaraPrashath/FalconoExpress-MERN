import React from "react";
import { CheckCircle } from "lucide-react";

const Pricing = () => {
  return (
    <div className=" py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Simple, Transparent Pricing</h2>
        <p className="text-gray-600 mb-12">Choose the plan that fits your shipping needs.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-700">Basic</h3>
            <p className="text-gray-600 mt-2">For occasional delivery</p>
            <p className="text-3xl font-bold text-red-500 mt-4">$9.99<span className="text-sm text-gray-500">/month</span></p>
            <ul className="text-gray-600 mt-4 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Up to 10 delivery/month</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Standard tracking</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Email support</li>
            </ul>
            <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Get Started</button>
          </div>

          {/* Professional Plan */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center border-2 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-700">Professional</h3>
            <p className="text-gray-600 mt-2">For growing businesses</p>
            <p className="text-3xl font-bold text-red-500 mt-4">$29.99<span className="text-sm text-gray-500">/month</span></p>
            <ul className="text-gray-600 mt-4 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Up to 50 shipments/month</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Real-time tracking</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Priority support</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Discounted rates</li>
            </ul>
            <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Get Started</button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-700">Enterprise</h3>
            <p className="text-gray-600 mt-2">For high-volume shippers</p>
            <p className="text-3xl font-bold text-red-500 mt-4">$99.99<span className="text-sm text-gray-500">/month</span></p>
            <ul className="text-gray-600 mt-4 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Unlimited shipments</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Advanced tracking & analytics</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> 24/7 dedicated support</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Custom integration</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-red-500" /> Bulk shipping tools</li>
            </ul>
            <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
