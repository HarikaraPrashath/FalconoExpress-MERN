import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/FALCON LOGO-8.png";
import Button from "../Button/Button";
import { useAuthContext } from "../../hook/useAuthContext";

function Navbar() {
  const { user } = useAuthContext();
  const location = useLocation(); // Get the current path

  useEffect(() => {
    if (user && user.user) {
      console.log("User from AuthContext in navbar", user);
      console.log("User id:", user.user.id);
      console.log("User email:", user.user.email);
      console.log("User username:", user.user.username);
      console.log("User role:", user.user.role);
    } else {
      console.log("User is null or undefined");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white ">
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

      {/* Right Side - Login/Profile/Dashboard */}
      <div>
        {user && user.user ? (
          user.user.role === "admin" ? (
            <Button to="/admin-dashboard" label="Dashboard" />
          ) : (
            <Button to={`/userProfile/${user.user.id}`} label="Account" />
          )
        ) : (
          <Button to="/login" label="Login" />
        )}
      </div>
    </div>
  );
}

// Active NavItem
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
