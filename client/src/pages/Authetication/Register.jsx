import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");
  
    // Clear previous errors
    setError("");
  
    // Validation for empty fields
    if (!email || !password || !username) {
      setError("Please fill in all details.");
      return; // Stop execution
    }
  
    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    console.log("Submit successful");
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 bg-gradient-to-r from-red-600 to-red-400">
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://images.pexels.com/photos/7621127/pexels-photo-7621127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Delivery"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Sign up in to Exclusive
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Enter your details below
          </p>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form  onChange={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm">Username</label>
              <input
                type="password"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">
                Email or Phone Number
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or phone number"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="flex justify-between items-center text-sm mb-4">
              <a href="#" className="text-red-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-red-600 transition-all duration-300"
            >
              Log in
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Do you have an account?{" "}
            <a href="/login" className="text-red-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
