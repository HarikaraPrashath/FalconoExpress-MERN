import React from "react";
import { CheckCircle } from "lucide-react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "E-commerce Manager",
    company: "FalconoExpress",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review: "FalconoExpress has transformed our logistics. The real-time tracking and reliable delivery have significantly improved our customer satisfaction.",
  },
  {
    name: "Michael Chen",
    title: "Small Business Owner",
    company: "FalconoExpress",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    review: "The customer service is exceptional. Any issues are resolved quickly, and the team goes above and beyond to ensure our packages arrive on time.",
  },
  {
    name: "Jessica Rodriguez",
    title: "Logistics Director",
    company: "FalconoExpress",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    rating: 5,
    review: "As an enterprise client, the custom integration with our systems has streamlined our entire shipping process. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <div className=" py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
        <p className="text-gray-600 mb-12">Don't just take our word for it. Here's what our customers have to say about <span className="text-blue-500 font-semibold">FalconoExpress</span>.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FaQuoteLeft className="text-red-500 text-3xl mb-3" />
              <p className="text-gray-600 italic">"{testimonial.review}"</p>

              {/* Star Ratings */}
              <div className="flex mt-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className={`text-yellow-400 text-lg ${i < testimonial.rating ? "opacity-100" : "opacity-30"}`} />
                ))}
              </div>

              {/* User Image & Info */}
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mt-4 border-2 border-red-500 shadow-sm" />
              <h4 className="mt-3 font-semibold text-gray-800">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.title} - <span className="font-semibold">{testimonial.company}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
