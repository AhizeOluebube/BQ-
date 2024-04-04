import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import handleAuthError from "../utils/handleAuthError";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem("token")) || null;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("userinfo"));
    if (getUser) {
      setUser(getUser);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem("userinfo", JSON.stringify(user));
    }
  }, [user]);

  const handleSignUp = async (formData) => {
    setIsSubmitting(true);
    console.log("Form Submitted");
    console.log(formData);
    try {
      const { data } = await axiosInstance.post("/api/auth/signup", formData);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", JSON.stringify(data.token));
      toast.success(`Welcome ${data.user.username}`);
      // navigate("/topic-selection");
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetUser = async () => {
    try {
      const { data } = await axiosInstance.get("/auth", {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Please Sign In", { id: "special" });
      // localStorage.removeItem("token");
      // navigate("/signin");
    }
  };

  console.log(user);
  const contextData = {
    user,
    setUser,
    token,
    setToken,
    handleSignUp,
    isSubmitting,
    setIsSubmitting,
    handleGetUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
