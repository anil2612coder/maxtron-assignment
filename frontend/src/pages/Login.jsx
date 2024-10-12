import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isLoggedIn = await login(email, password);
      if (isLoggedIn) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        darkMode
          ? "bg-gray-800"
          : "bg-gradient-to-r from-blue-300 to-purple-300"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-lg -mt-32 md:mt-0 shadow-lg w-full max-w-sm ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            darkMode ? "text-white" : "text-gray-700"
          }`}
        >
          Login
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Email
          </label>
          <div
            className={`flex items-center border rounded-md p-2 mt-1 ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <FaEnvelope className={`text-gray-400 mr-2`} />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`border-0 focus:ring-0 focus:outline-none w-full ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Password
          </label>
          <div
            className={`flex items-center border rounded-md p-2 mt-1 ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <FaLock className={`text-gray-400 mr-2`} />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`border-0 focus:ring-0 focus:outline-none w-full ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg ${
            isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"
          } transition duration-300`}
        >
          {isLoading ? "Please Wait..." : "Login"}
        </button>
        <p
          className={`mt-4 text-center ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don't have an account?
          <Link to="/register" className="text-blue-500 hover:underline">
            {" "}
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
