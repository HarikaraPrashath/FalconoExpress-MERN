import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-red-600 py-10 mt-17">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          
          {/* Logo & About Section */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold">FalconoExpress</h2>
            <p className="text-gray-400 mt-2">
              Fast, reliable delivery for businesses of all sizes. Ship globally with confidence.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="hover:text-blue-400">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-blue-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-pink-400">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">News</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Domestic Shipping</a></li>
                <li><a href="#" className="hover:text-white">International Shipping</a></li>
                <li><a href="#" className="hover:text-white">Freight Services</a></li>
                <li><a href="#" className="hover:text-white">Custom Solutions</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Shipping Rates</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          © 2025 SwiftShip. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
