import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic (e.g., send data to an API)
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-gray-200 to-gray-200 py-16">
      <div className="container mx-auto px-6">
        {/* Contact Information Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Whether you have a question, feedback, or want to get in touch, feel free to drop us a message.
          </p>
        </div>

        {/* Contact Form */}
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Write your message here"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Office</h3>
          <p className="text-lg text-gray-600 mb-2">Address: 1234 Street, City, Country</p>
          <p className="text-lg text-gray-600 mb-2">Phone: (123) 456-7890</p>
          <p className="text-lg text-gray-600">Email: contact@company.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
