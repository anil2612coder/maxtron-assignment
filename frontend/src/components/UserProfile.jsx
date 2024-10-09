import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const UserProfile = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate("/profile-update");
  };

  return (
    <div
      className={`flex items-start justify-center min-h-screen pt-20 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-800"
          : "bg-gradient-to-r from-blue-200 to-purple-200"
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-2xl w-full max-w-3xl ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-white to-blue-50 text-gray-700"
        }`}
      >
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          {user?.name}'s Profile
        </h1>

        <div className="overflow-hidden shadow-lg rounded-lg">
          <table className="min-w-full table-auto rounded-lg">
            <thead>
              <tr>
                <th
                  className={`px-6 py-3 text-lg font-semibold ${
                    darkMode
                      ? "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  } text-left rounded-tl-lg`}
                >
                  Field
                </th>
                <th
                  className={`px-6 py-3 text-lg font-semibold ${
                    darkMode
                      ? "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  } text-left rounded-tr-lg`}
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={`${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-blue-100"
                } transition duration-300 ease-in-out`}
              >
                <td className="px-6 py-4 border-b border-gray-700 text-xl">
                  Name
                </td>
                <td className="px-6 py-4 border-b border-gray-700 text-xl">
                  {user?.name}
                </td>
              </tr>
              <tr
                className={`${
                  darkMode
                    ? "bg-gray-900 hover:bg-gray-800"
                    : "bg-gray-50 hover:bg-blue-50"
                } transition duration-300 ease-in-out`}
              >
                <td className="px-6 py-4 border-b border-gray-700 text-xl">
                  Email
                </td>
                <td className="px-6 py-4 border-b border-gray-700 text-xl">
                  {user?.email}
                </td>
              </tr>
              <tr
                className={`${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-blue-100"
                } transition duration-300 ease-in-out`}
              >
                <td className="px-6 py-4 text-xl">Role</td>
                <td className="px-6 py-4 text-xl">{user?.role}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={handleUpdateProfile}
          className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
