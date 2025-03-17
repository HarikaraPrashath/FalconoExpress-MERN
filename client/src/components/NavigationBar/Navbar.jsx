import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/FALCON LOGO-8.png";
import Button from "../Button/Button";

function Navbar() {
  const location = useLocation(); // Get the current path

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md shadow-red-600 ">
      {/* Left Side - Logo */}
      <Link to="/">
        <img src={logo} alt="Falcon Express" className="h-12" />
      </Link>

      {/* Center Navigation */}
      <div className="flex gap-6">
        <NavItem to="/" label="Home" activePath={location.pathname} />
        <NavItem to="/delivery" label="Delivery" activePath={location.pathname} />
        <NavItem to="/about" label="About" activePath={location.pathname} />
        <NavItem to="/contact" label="Contact" activePath={location.pathname} />
      </div>

      {/* Right Side - Login */}
      <div>
        <Button to="/login" label="Login"/>
      </div>
    </div>
  );
}

// mapping all the nav button 
const NavItem = ({ to, label, activePath }) => (
  <Link
    to={to}
    className={`text-lg font-medium transition duration-300 ${
      activePath === to ? "text-red-600" : "text-gray-700 hover:text-red-500"
    }`}
  >
    {label}
  </Link>
);

export default Navbar;
