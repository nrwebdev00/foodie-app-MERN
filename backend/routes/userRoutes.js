import express from 'express';

const router = express.Router()

import {
  registerUser,
  loginUser,
  getUser,
  getProfileUser,
  updateUserProfile,
  deleteUserAndProfile

} from '../controllers/userControllers.js';
import {
  protectUserLogin,
  AdminUserAuth,
  StaffUserAuth,
  ModeratorUserAuth,
 }
 from '../middleware/authMiddleware.js';


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', protectUserLogin, getUser);
router.get('/profile', protectUserLogin, getProfileUser )
router.put('/profile', protectUserLogin, updateUserProfile)
router.delete('/profile', protectUserLogin, AdminUserAuth, deleteUserAndProfile)

export default router