import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">
        <Link to="/">Multi-Role Dashboard</Link>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <ThemeToggle />
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-white flex items-center space-x-2 hover:text-gray-200"
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/profile"
              className="text-white flex items-center space-x-2 hover:text-gray-200"
            >
              <FaUserCircle />
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-white flex items-center space-x-2 hover:text-gray-200"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-gray-200">
              Register
            </Link>
          </>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <ThemeToggle />
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none ml-4"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded shadow-lg z-50">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-white flex items-center space-x-2 hover:text-gray-200 mb-4"
                onClick={toggleMenu}
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/profile"
                className="block text-white flex items-center space-x-2 hover:text-gray-200 mb-4"
                onClick={toggleMenu}
              >
                <FaUserCircle />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block text-white flex items-center space-x-2 hover:text-gray-200"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-white hover:text-gray-200 mb-4"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-white hover:text-gray-200"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
