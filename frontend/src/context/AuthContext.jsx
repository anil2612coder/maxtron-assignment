import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (name, email, password, role) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
      {
        name,
        email,
        password,
        role,
      }
    );
    toast.success(response.data.message);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
