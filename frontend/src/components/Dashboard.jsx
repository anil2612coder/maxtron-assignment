import React from "react";
import { useAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile";
import ProfileUpdate from "./ProfileUpdate";
import UserList from "./UserList";
import { useTheme } from "../context/ThemeContext";

const DashBoard = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen md:p-6 p-1 flex flex-col items-center space-y-3 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-700"
          : "bg-gradient-to-br from-blue-100 to-purple-200"
      }`}
    >
      {user.role === "admin" ? (
        <div
          className={`${
            darkMode
              ? "bg-gradient-to-br from-gray-600 to-gray-500"
              : "bg-gradient-to-br from-gray-100 to-gray-200"
          } shadow-lg rounded-lg p-2 md:p-8 w-full max-w-4xl`}
        >
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            } mb-6 text-center`}
          >
            Admin Dashboard
          </h1>
          <UserList />
        </div>
      ) : (
        <>
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-6 text-center`}
          >
            User Dashboard
          </h1>
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`${
                darkMode
                  ? "bg-gradient-to-br from-gray-300 to-gray-500"
                  : "bg-gradient-to-br from-white to-blue-50"
              } shadow-lg rounded-lg p-4`}
            >
              <UserProfile />
            </div>
            <div
              className={`${
                darkMode
                  ? "bg-gradient-to-br from-gray-300 to-gray-500"
                  : "bg-gradient-to-br from-white to-blue-50"
              } shadow-lg rounded-lg p-4`}
            >
              <ProfileUpdate />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
