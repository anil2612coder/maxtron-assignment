// controllers/userController.js

import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, email, password, role } = req.body;
  

  try {
    const updateData = { name, email, role };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });

    res.status(200).json({ updatedUser, success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// controllers/userController.js
export const updateUser = async (req, res) => {
    const userId  = req.params.id;// Get userId from URL params
    const { name, email, password, role } = req.body;
  
    try {
      const updateData = { name, email, role };
      if (password) {
        updateData.password = await bcrypt.hash(password, 10); // Hash the password if provided
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const userDetails = async (req, res) => {
    const userId  = req.params.id; // Get userId from URL params
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ success: true, user }); // Send user details
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// New delete user function
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


