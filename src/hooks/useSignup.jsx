import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    firstName,
    lastName,
    username,
    email,
    password,
    selectedRole
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/adminAuth/adminRegister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
        selectedRole,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return;
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("admin", JSON.stringify(json));

      localStorage.setItem("token", json.token);
      // update the auth context
    //   dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
