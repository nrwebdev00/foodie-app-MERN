import asyncHandler from 'express-async-handler';

import Recipe from '../models/Recipe/recipeModel.js';


// @desc Create Recipe
// @route POST /api/recipe
// @access PRIVATE - STAFF & ADMIN
const createRecipe = asyncHandler(async (req, res) =>{
  const recipe = new Recipe({
    user: req.user._id,
    title: 'New Recipe...',
    desc: 'Recipe Description',
    mainImage: 'http://mainimage.com',
  })

  const newRecipe = await recipe.save()
  res.status(201).json({
    recipe: newRecipe
  })
})


export { createRecipe }