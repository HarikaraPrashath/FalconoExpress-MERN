import React from 'react';
import { FaBuilding, FaDollarSign, FaGift, FaShoppingCart, FaTwitter, FaLinkedin, FaTruck, FaHeadset, FaShieldAlt, FaTrophy } from 'react-icons/fa';

import profile from '../../../assets/About/ceo.jpg';
import profile1 from '../../../assets/About/cheif.jpg'; // Note: "cheif" seems like a typo; should it be "chief"?
import profile2 from '../../../assets/About/worker.jpg';
import pictureabout from '../../../assets/About/about_main.jpg';

const AboutUs = () => {
  // Data for statistics
  const stats = [
    { icon: <FaBuilding />, number: '10.5K', text: 'Sellers active on our site' },
    { icon: <FaDollarSign />, number: '33K', text: 'Monthly Product Sale' },
    { icon: <FaGift />, number: '45.5K', text: 'Customers active on our site' },
    { icon: <FaShoppingCart />, number: '25K', text: 'Annual gross sale on our site' },
  ];

  // Data for team members
  const team = [
    { name: 'Prasath .S.T', title: 'Co-Founder & Chairman', image: profile, linkedin: '#' },
    { name: 'Ganga. R', title: 'Managing Director', image: profile1, twitter: '#', linkedin: '#' },
    { name: 'Silva.G.R', title: 'Product Designer', image: profile2, twitter: '#', linkedin: '#' },
  ];

  // Data for features
  const features = [
    { icon: <FaTruck />, title: 'FAST DELIVERY', description: 'Free delivery for all orders over $140' },
    { icon: <FaHeadset />, title: '24/7 CUSTOMER SERVICE', description: 'Friendly 24/7 customer support' },
    { icon: <FaShieldAlt />, title: 'MONEY BACK GUARANTEE', description: 'We return money within 30 days' },
  ];

  // Data for achievements
  const achievements = [
    { year: '2020', title: 'Launch of Exclusive', description: 'Started as a small e-commerce platform with a vision to serve millions.' },
    { year: '2021', title: 'Reached 500K Customers', description: 'Expanded our user base, making online shopping more accessible.' },
    { year: '2022', title: 'Partnered with 200+ Brands', description: 'Collaborated with renowned brands to enhance our product catalog.' },
    { year: '2023', title: 'Surpassed 1 Million Products', description: 'Achieved a diverse inventory, providing more options to customers.' },
    { year: '2024', title: 'Introduced Express Delivery', description: 'Reduced delivery time significantly with a new logistics network.' },
    { year: '2025', title: 'Serving 3M+ Customers', description: 'Became a household name in South Asia with millions of satisfied customers.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="text-center py-10">
        <h4 className="text-2xl font-bold text-gray-900">Would you like to know</h4>
        <h1 className="text-4xl font-bold text-red-500">About Us?</h1>
      </header>

      {/* Our Story Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Our journey began to make deliveries faster, easier, and more reliable.
            As someone who faced constant delays and unreliable service, I set out to build a delivery
            service that people could truly count on. What started as a small local operation has
            grown into a trusted name, ensuring that packages, meals, and essentials reach their
            destinations on time.
          </p>
          <p className="text-gray-600">
            From deliveries to real-time tracking, our mission is to simplify your life with seamless
            service. Whether you’re sending a gift or receiving groceries, we’re here to make sure it
            arrives safely and on time. Thank you for trusting us with your deliveries—we’re excited
            to serve you!
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src={pictureabout}
            alt="Delivery person on bicycle"
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-100">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 rounded-lg shadow-md bg-white text-gray-900 transition-colors duration-300 hover:bg-red-500 hover:text-white"
          >
            <div className="text-3xl mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-bold">{stat.number}</h3>
            <p className="text-center">{stat.text}</p>
          </div>
        ))}
      </section>

      {/* Achievements Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group flex items-center bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <FaTrophy className="text-gray-900 text-4xl mr-4 transition-colors duration-300 group-hover:text-red-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{achievement.year}</h3>
                <p className="text-gray-700 font-semibold">{achievement.title}</p>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100">
        {team.map((member, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-gray-600 mb-4">{member.title}</p>
            <div className="flex gap-4">
              {member.twitter && (
                <a href={member.twitter} className="text-gray-600 hover:text-blue-500">
                  <FaTwitter size={20} />
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} className="text-gray-600 hover:text-blue-700">
                  <FaLinkedin size={20} />
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-4xl text-gray-900 mb-4">{feature.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutUs;