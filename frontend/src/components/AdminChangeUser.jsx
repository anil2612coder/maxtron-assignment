import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import toast from "react-hot-toast";

const AdminChangeUser = () => {
  const { id: userId } = useParams();
  console.log(userId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { token } = useAuth();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const user = response.data.user;
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      } catch (error) {
        toast.error("Failed to fetch user details.");
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`,
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error("Profile not updated.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile.");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        darkMode
          ? "bg-gray-800"
          : "bg-gradient-to-r from-blue-200 to-purple-200"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-4 rounded-lg shadow-lg w-full max-w-sm ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            darkMode ? "text-white" : "text-gray-700"
          }`}
        >
          Update Profile
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Name
          </label>
          <div
            className={`flex items-center border rounded-md p-2 mt-1 ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <FaUser className="text-gray-400 mr-2" />
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`border-0 focus:ring-0 focus:outline-none w-full ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            />
          </div>
        </div>

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
            <FaEnvelope className="text-gray-400 mr-2" />
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
            <FaLock className="text-gray-400 mr-2" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password (leave blank if unchanged)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border-0 focus:ring-0 focus:outline-none w-full ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Role:
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`border rounded w-full p-2 ${
              darkMode
                ? "border-gray-600 bg-gray-800 text-white"
                : "border-gray-300 bg-white text-black"
            }`}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminChangeUser;
