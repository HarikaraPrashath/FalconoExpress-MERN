import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    // Check for missing fields
    if (!password || !email || !username) {
      setIsLoading(false);
      setError("All fields are required. Please fill in all details.");
      return { error: "All fields are required. Please fill in all details." };
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      setIsLoading(false);
      setError("Invalid email address. Please enter a valid email.");
      return { error: "Invalid email address. Please enter a valid email." };
    }

    console.log("API URL:", import.meta.env.VITE_FRONT_END_API_URL);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_FRONT_END_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, username }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Read response as text
        setIsLoading(false);
      }

      const json = await response.json();

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      return json; // Return the response
    } catch (err) {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
