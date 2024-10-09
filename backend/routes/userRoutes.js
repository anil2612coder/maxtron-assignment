import express from 'express';
import {  deleteUser, getAllUsers, updateUser, updateUserProfile, userDetails } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllUsers);
router.put('/update-profile', protect, updateUserProfile);
router.delete('/:id', protect, deleteUser);
router.put('/:id', protect, updateUser);
router.get('/:id', protect, userDetails);



export default router;
