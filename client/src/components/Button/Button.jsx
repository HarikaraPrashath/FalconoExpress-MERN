import { Link } from "react-router-dom";

const Button = ({ to, label ,className  }) => (
  <Link
    to={to}
    className={`px-5 py-2 text-lg font-semibold  rounded-3xl bg-red-600 text-white 
               shadow-md shadow-red-400 transition-all duration-300 
               hover:bg-red-700 hover:shadow-lg hover:shadow-red-500 
               focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
  >
    {label}
  </Link>
);

export default Button;
