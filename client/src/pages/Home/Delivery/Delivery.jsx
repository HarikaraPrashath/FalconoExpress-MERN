import React from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Find Out A Little More About Us",
    description:
      "We are a company dedicated to the distribution of products by delivery to your home or the place where you are, with the best quality of delivery.",
    image: "\src/assets/Images/e-commerce-website-development-service.jpg", // Put actual image in public folder
    reverse: false,
  },
  {
    title: "Your Safety Is Important",
    description:
      "When your order reaches you, we’ll find the fastest delivery person, so that your purchase has very little contact, except the receipt and the delivery at home.",
    image: "\src/assets/Images/male-couriers-delivering-parcels_74855-14101.avif",
    reverse: true,
  },

];

export default function Delivery() {
  const navigate = useNavigate(); 
  
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Order Products <br />
              <span className="text-yellow-500">Faster Easier</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Order your favorite foods at any time and we will deliver them right to where you are.
            </p>
            <button
              className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full"
              onClick={() => navigate("/over")} // Correct usage
            >
              Get Started
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="../src\assets\Images\1840_SkVNQSBHRVIgMTAxNy0yOA.jpg"
              alt="Delivery Hero"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-10">Some Services We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {/* Card 1 */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <img src="../src\assets\Images\Wallet-pana.webp" alt="Payment Done" className="mx-auto mb-4 w-32 h-32 object-contain" />
            <h3 className="font-semibold text-lg">Payment Done</h3>
            <p className="text-sm text-gray-600 mt-2">Pay with ease via Paypal, credit and debit cards.</p>
            <button className="mt-4 text-red-500 text-sm">Learn More</button>
          </div>
          {/* Card 2 */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <img src="../src\assets\Images\male-couriers-delivering-parcels_74855-14101.avif" alt="Find Your Product" className="mx-auto mb-4 w-32 h-32 object-contain" />
            <h3 className="font-semibold text-lg">Find Your Product</h3>
            <p className="text-sm text-gray-600 mt-2">We offer tons of products through the internet.</p>
            <button className="mt-4 text-red-500 text-sm">Learn More</button>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <img src="../src\assets\Images\delivery-worker-character-illustration-happy-female-courier-holding-parcel-box-fast-online-delivery-service-vector.jpg" alt="Product Received" className="mx-auto mb-4 w-32 h-32 object-contain" />
            <h3 className="font-semibold text-lg">Product Received</h3>
            <p className="text-sm text-gray-600 mt-2">Your items are now in delivery. See when it arrives!</p>
            <button className="mt-4 text-red-500 text-sm">Learn More</button>
          </div>
        </div>
      </section>


      <div className="flex flex-col gap-16 p-6 md:p-12">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            section.reverse ? "md:flex-row-reverse" : ""
          } items-center gap-8`}
        >
          <div className="w-full md:w-1/2">
            <img src={section.image} alt={section.title} className="w-full" />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {section.title}
            </h2>
            <p className="text-gray-600">{section.description}</p>
          </div>
        </div>
      ))}
    </div>

      {/* Delivery Tracker Section */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <img src="../src\assets\Images\flat-style-illustration-of-courier-wearing-face-mask-and-handing-package-box-to-customer-both-showing-up-from-smart-phone-device-concept-of-delivery-service-for-online-shopping-.jpg" alt="Delivery Tracking" className="w-72 h-72 object-contain" />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Watch Your Delivery At Any Time</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              With our app you can view the route of your order, from our local headquarters to the place where you are. Look for the app now!
            </p>
            <div className="flex gap-4">
              <button className="bg-black text-white px-4 py-2 rounded">App Store</button>
              <button className="bg-black text-white px-4 py-2 rounded">Google Play</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}