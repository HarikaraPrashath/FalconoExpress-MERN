import React from "react";
import home from "../../assets/img/home.png";
import { TbTruckDelivery } from "react-icons/tb";
import Button from "../../components/Button/Button";
import delivery from "../../assets/img/delivery.png";
import order from "../../assets/img/order.png";
import pack from "../../assets/img/package.png";
import give from "../../assets/img/give.png";
import Footer from "../../components/Footer/Footer";
import Feature from "../../components/HomePageFeature/FeatureDetails";
import Pricing from "../../components/HomePageFeature/Pricing";
import Testimonials from "../../components/HomePageFeature/Feedback";
import CallToAction from "../../components/HomePageFeature/CallToAction";
import Chatbot from '../../components/Chatbox/Chatbot'; // Adjust the path as necessary


const HomePage = () => {
  return (
    <>
      {/* Gradient Background */}
      <div className="">
        <div className="mt-2 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 gap-10">
          {/* Left Section */}
          <div className="md:w-1/2 flex flex-col gap-6 mr-20">
            {/* Delivery Service */}
            <div className="flex items-center gap-2 bg-orange-100 text-red-600 font-semibold px-4 py-2 rounded-md w-fit shadow-lg">
              <TbTruckDelivery className="text-2xl" />
              <span className="text-sm">Fast Delivery Service</span>
            </div>

            {/* Main Headings */}
            <h2 className="font-bold text-gray-800 leading-tight">
              <p className="text-4xl md:text-5xl">Ready to Deliver</p>
              <p className="text-6xl md:text-7xl text-black mt-2">
                We've Got You, <br />
                <span className="text-red-600">Always!</span>
              </p>
            </h2>

            {/* CTA Button */}
            <Button
              to="/book"
              label="Book Now"
              className="w-[80%] md:w-[200px] py-3 px-6 bg-red-600 text-white rounded-2xl shadow-md hover:bg-red-700 transition-colors duration-300 flex justify-center items-center text-center"
            />
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={home}
              alt="Falcon Express"
              className="w-[80%] md:w-[600px] h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Steps to Package Delivery Section */}
        <h2 className="text-4xl mt-6 font-semibold text-center text-gray-800 mb-6">
          Steps to Package Delivery
        </h2>

        <div className="flex gap-25 justify-center items-center mt-12 ">
          {/* Order Section */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={order}
              alt="Place the order"
              className="h-40 mb-4 object-contain"
            />
            <p className="text-2xl font-semibold text-gray-800">Place the Order</p>
            <p className="font-bold text-2xl"> 44+</p>
          </div>

          {/* Packing Section */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={pack}
              alt="Packing order"
              className="h-40 mb-4 object-contain"
            />
            <p className="text-2xl font-semibold text-gray-800">Packing the Order</p>
            <p className="font-bold text-2xl"> 44+</p>
          </div>

          {/* Delivery Section */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={delivery}
              alt="Collect the package"
              className="h-40 mb-4 object-contain"
            />
            <p className="text-2xl font-semibold text-gray-800">
              Collect the Package
            </p>
            <p className="font-bold text-2xl"> 44+</p>
          </div>

          {/* Safe Delivery Section */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={give}
              alt="Safely deliver"
              className="h-40 mb-4 object-contain"
            />
            <p className="text-2xl font-semibold text-gray-800">Safe Delivery</p>
            <p className="font-bold text-2xl"> 44+</p>
          </div>
        </div>

        <div className=" mt-8 container mx-auto p-8">
          {/* Feature */}
          <Feature />

          {/* Title */}
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
            Find an Outlet Near You
          </h2>

          {/* Content Wrapper */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Map Section */}
            <div className="w-full md:w-1/2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63350.05127538851!2d79.82896995!3d6.92707805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25938c9d5f739%3A0x7b78edb9b2c7bde1!2sColombo!5e0!3m2!1sen!2slk!4v1700000000000"
                width="100%"
                height="550"
                className="rounded-lg shadow-lg"
                allowFullScreen=""
                loading="lazy"
                title="Colombo Map"
              ></iframe>
            </div>

            {/* Outlet List Section */}
            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
              {/* Outlet Item 1 */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1 pr-4">
                  <h1 className="text-xl font-bold text-gray-700">Maharagama</h1>
                  <p className="text-gray-600">Rating: 5.6</p>
                  <p className="text-gray-600">(2k)-Rs-Colombo</p>
                  <p className="text-red-600 font-medium">24-hour open</p>
                  <p className="text-gray-600">Manager: Disanake</p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="https://carriageworks.com.au/wp-content/uploads/Bays-22-24_CEO-CookOff_2015_3.png"
                    alt="Outlet"
                    className="h-32 w-32 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <hr className="border-gray-300 mb-6" />

              {/* Outlet Item 2 */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1 pr-4">
                  <h1 className="text-xl font-bold text-gray-700">Nallur</h1>
                  <p className="text-gray-600">Rating: 5.6</p>
                  <p className="text-gray-600">(2k)-Rs-Jaffna</p>
                  <p className="text-red-600 font-medium">24-hour open</p>
                  <p className="text-gray-600">Manager: Raja</p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="https://thumbs.dreamstime.com/b/people-look-over-books-large-warhouse-san-francisco-september-th-annual-big-book-sale-fort-mason-event-37374226.jpg"
                    alt="Outlet"
                    className="h-32 w-32 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <hr className="border-gray-300 mb-6" />

              {/* Outlet Item 3 */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1 pr-4">
                  <h1 className="text-xl font-bold text-gray-700">Katugasdoda</h1>
                  <p className="text-gray-600">Rating: 5.6</p>
                  <p className="text-gray-600">(2k)-Rs-Kandy</p>
                  <p className="text-red-600 font-medium">24-hour open</p>
                  <p className="text-gray-600">Manager: Mahila</p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="https://th.bing.com/th/id/R.017a150fda517f7c5b39824ee8ead17e?rik=aex9gDH9V8x2BA&riu=http%3a%2f%2fwww.film.ri.gov%2flocationpics%2fcategory%2fimg%2fCranstonSt.Armory%2farmory1.jpg&ehk=yx4lJljtSA5AUyaQ6mDWz4fbFZPUog5APhWrTsCX7mc%3d&risl=&pid=ImgRaw&r=0"
                    alt="Outlet"
                    className="h-32 w-32 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Pricing />
        <Testimonials />
        <CallToAction />
        <Footer />

       
        <div
          title="How can we help you?"
          
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors duration-300 cursor-pointer text-xl font-bold"
        >
          ?
        </div>
      </div>
      {/* Help Button with Tooltip */}
<div className="fixed bottom-6 right-6 z-50 group">
  <div className="relative">
    {/* Tooltip */}
  


    {/* Circular Button */}
    {/* <button className="w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center text-2xl">
      ?
    </button> */}

<div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
      
      </div>
      <Chatbot />
    </div>
  </div>
</div>

    </>
  );
};

export default HomePage;
