import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import { Toaster } from "react-hot-toast";

import ProfileUpdate from "./components/ProfileUpdate";
import AdminChangeUser from "./components/AdminChangeUser";

const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile-update" element={<ProfileUpdate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-update/:id" element={<AdminChangeUser />} />

            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<UserProfile />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
