import { useAuthContext } from "./useAuthContext";

import { useEffect, useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();


  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // Validation for empty fields
    if (!email || !password) {
      setError("Please fill in all details.");
      return; // Stop execution
    }
  
    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {  
      setError("Please enter a valid email address.");
      return;
    }
   console.log("Path",`${import.meta.env.VITE_FRONT_END_API_URL}/auth/login`)

    //need to update the fetching part
    const response = await fetch(`${import.meta.env.VITE_FRONT_END_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      return { success: false, error: json.message };
    }

    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      dispatch({ type: "LOGIN", payload: json });

      //update
      setIsLoading(false);

      setTimeout(() => {
        window.location.reload(); // Refresh the page to apply the changes
      }, 500);
    }
  };

  return { isLoading, error, login };
};
