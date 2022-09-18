import express from 'express';

const router = express.Router()

import { createRecipe } from '../controllers/recipeControllers.js';

import {
  protectUserLogin,
  AdminUserAuth,
  StaffUserAuth,
  ModeratorUserAuth
 } from '../middleware/authMiddleware.js';

router.post('/create', protectUserLogin, createRecipe)

 export default router