import asyncHandler from 'express-async-handler';

import generateToken from '../utlis/generateToken.js';
import errorResponse from '../middleware/error.js';
import User from '../models/Users/userModel.js';
import Profile from '../models/Users/profileModel.js';


// @des Login - Auth User and Get Token
// @route POST /api/users/login
// @access PUBLIC
const loginUser = asyncHandler(async (req, res) =>{
  const { userName, password } = req.body;

  const user = await User.findOne({ userName })
  const profile = await Profile.findOne({ userName })


  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
      profileId: profile._id,
      name: user.name,
      userName: user.userName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  }else{
    res.status(401).json({
      success: false,
      message: 'Invalid user-name or password.'
    })
  }
})



// @desc Register User and Create Profile
// @route POST /api/users/Register
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) =>{
  const {name, userName, email, password} = req.body;

  const CheckIfUserExists = await User.findOne({ email })
  const CheckIfProfileExists = await Profile.findOne({ email })

  if(CheckIfUserExists && CheckIfProfileExists){
    res.status(400).json({
      success: false,
      message: `User already Exists with email of ${email}.`
    })
  }


  const user = await User.create({
    name,
    userName,
    email,
    password
  })

  const profile = await Profile.create({
    name,
    userName,
    email
  })

  if(user && profile){
    res.status(201).json({
      _id: user._id,
      profile: profile,
      name: user.name,
      email: user.email,
      userName: user.userName,
      role: user.role
    })
  }else{
    res.status(400).json({
      success: false,
      message: `Invalid User Data.`
    })
  }

})


// @desc Get User
// @route GET /api/users/user
// @access PRIVATE - LOGIN
const getUser = asyncHandler(async(req, res) =>{
  const user = await User.findById(req.user._id)

  if(user){
    res.json({
      _id: user._id,
      name: user.name,
      userName: user.userName,
      email: user.email,
      role: user.role,
    })
  }else{
    res.status(404).json({
      success: false,
      message: `User Not Found.`
    })
  }
})

// @desc GET Profile of User
// @route GET /api/users/profile
// @access PRIVATE - LOGIN
const getProfileUser = asyncHandler(async(req, res) =>{
  const user = await User.findById(req.user._id)
  const profile = await Profile.findOne({ userName: req.user.userName })

  if(user && profile){
    res.json({
      _id: user._id,
      bio: profile.bio,
      name: profile.name,
      email: user.email,
      password: user.password,
      profileImage: profile.profileImage,
      facebookUrl: profile.facebookUrl,
      twitterUrl: profile.twitterUrl,
      youtubeUrl: profile.youtubeUrl,
      twitchUrl: profile.twitchUrl,
      webkitURL: profile.webkitURL,
      location: profile.location,
    })
  }else{
    res.status(404).json({
      success: false,
      message: `User Not Found.`
    })
  }
})

// @desc Update user Profile
// @route PUT api/users/profile
// @access PRIVATE - LOGIN
const updateUserProfile = asyncHandler(async (req, res) =>{
  const user = await User.findById(req.user._id)
  const profile = await Profile.findOne({ userName: user.userName})

  if(profile && user){
    profile.name = req.body.name || profile.name
    user.name = req.body.name || user.name
    user.role = 'admin',
    profile.bio = req.body.bio || profile.bio
    profile.profileImage = req.body.profileImage || profile.profileImage
    profile.facebookUrl = req.body.facebookUrl || profile.facebookUrl
    profile.twitterUrl = req.body.twitterUrl || profile.twitterUrl
    profile.youtubeUrl = req.body.youtubeUrl || profile.youtubeUrl
    profile.twitchUrl = req.body.twitchUrl || profile.twitchUrl
    profile.websiteUrl = req.body.websiteUrl || profile.websiteUrl
    profile.location = req.body.location || profile.location

    if(req.body.password){
      user.password = req.body.password
    }
    if(req.body.email){
      console.log(req.body.email)
      const checkIfNewEmailExists = User.findOne({email: req.body.email})
      if(checkIfNewEmailExists){
        user.email = req.body.email
      } else {
        res.status(401).json({
          success: false,
          message: `Email address is already in Use.`
        })
      }
    }

    const updatedUserProfile = await profile.save()
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUserProfile.name,
      bio: updateUserProfile.bio,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id)

    })
  }else{
    res.status(404).json({
      success: false,
      message: `User Not Found`
    })
  }
})


// @desc Delete User and Profile
// @route DELETE api/users/profile
// @access PRIVATE - LOGIN - ADMIN
const deleteUserAndProfile = asyncHandler(async (req, res) =>{
  const user = await User.findById(req.user._id)
  const profile = await Profile.findOne({ userName: user.userName})

  if(user && profile){
    await user.remove()
    await profile.remove()
    res.json({
      success: true,
      message: 'User and Profile Removed'
    })
  }else{
    res.status(404).json({
      success: false,
      message: `User Not Found`
    })
  }
})


export {
  registerUser,
  loginUser,
  getUser,
  getProfileUser,
  updateUserProfile,
  deleteUserAndProfile
}