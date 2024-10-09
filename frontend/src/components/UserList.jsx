import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaUserEdit, FaTrash } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserList = () => {
  const { token, user: currentUser } = useAuth();
  const { darkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [userCounts, setUserCounts] = useState({ user: 0, admin: 0 });
  const [filter, setFilter] = useState("all");
  const [notificationSent, setNotificationSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);

        if (!notificationSent) {
          toast.success("Users fetched successfully!");
          setNotificationSent(true);
        }

        const userRoles = response.data.reduce(
          (acc, user) => {
            acc[user.role] = acc[user.role] ? acc[user.role] + 1 : 1;
            return acc;
          },
          { user: 0, admin: 0 }
        );

        setUserCounts(userRoles);

        setChartData({
          labels: ["User", "Admin"],
          datasets: [
            {
              label: "User Roles",
              data: [userRoles.user, userRoles.admin],
              backgroundColor: ["#4F46E5", "#6366F1"],
            },
          ],
        });
      } catch (error) {
        toast.error("Failed to fetch users");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token, notificationSent]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);

        const updatedUserRoles = updatedUsers.reduce(
          (acc, user) => {
            acc[user.role] = acc[user.role] ? acc[user.role] + 1 : 1;
            return acc;
          },
          { user: 0, admin: 0 }
        );

        setUserCounts(updatedUserRoles);
        setChartData({
          labels: ["User", "Admin"],
          datasets: [
            {
              label: "User Roles",
              data: [updatedUserRoles.user, updatedUserRoles.admin],
              backgroundColor: ["#4F46E5", "#6366F1"],
            },
          ],
        });

        toast.success("User deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete user");
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/admin-update/${userId}`);
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "admin") return user.role === "admin";
    if (filter === "user") return user.role === "user";
    return true;
  });

  return (
    <div
      className={`p-5 space-y-8 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-100 to-purple-200"
      } rounded-lg shadow-lg`}
    >
      <h1
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        User List
      </h1>

      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg rounded-lg p-6`}
      >
        <h2
          className={`text-xl font-semibold ${
            darkMode ? "text-gray-100" : "text-gray-900"
          } mb-4`}
        >
          User Role Distribution
        </h2>
        <div className="flex justify-between mb-4">
          <h3
            className={`font-semibold text-lg ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Admins: <span className="font-extrabold">{userCounts.admin}</span>
          </h3>
          <h3
            className={`font-semibold text-lg ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Users: <span className="font-extrabold">{userCounts.user}</span>
          </h3>
        </div>
        <div className="max-w-md mx-auto">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: "Roles",
                  color: darkMode ? "#ffffff" : "#333",
                },
              },
              scales: {
                x: {
                  ticks: { color: darkMode ? "#ffffff" : "#333" },
                  grid: { color: darkMode ? "#4B5563" : "#e5e7eb" },
                },
                y: {
                  ticks: { color: darkMode ? "#ffffff" : "#333" },
                  grid: { color: darkMode ? "#4B5563" : "#e5e7eb" },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-xl font-semibold ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Filter by Role:
        </h2>
        <select
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } border border-gray-300 rounded-lg p-2 shadow-md ${
            darkMode ? "text-gray-200" : "text-gray-900"
          }`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="admin">Admin Users</option>
          <option value="user">Regular Users</option>
        </select>
      </div>

      <div
        className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden`}
      >
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`${
              darkMode ? "bg-gray-200" : "bg-white"
            } divide-y divide-gray-200 dark:divide-gray-700`}
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.name}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {user.role}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {user._id === currentUser._id ? (
                      <span className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg py-2 px-4">
                        It's you
                      </span>
                    ) : (
                      <>
                        <button
                          className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
                          onClick={() => handleEditUser(user._id)}
                        >
                          <FaUserEdit className="inline mr-1" />
                          Edit User
                        </button>
                        <button
                          className="text-white bg-gradient-to-r from-red-500 to-orange-500 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-2 ml-2"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <FaTrash className="m-[0.5px]" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
