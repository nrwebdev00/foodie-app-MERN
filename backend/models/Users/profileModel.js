import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    userName:{
      type: String,
      required: true,
      unique: true,
    },
    email:{
      type: String,
      required: true,
    },
    bio:{
      type: String
    },
    profileImage:{
      type: String,
      required: true,
      default: 'https://cdn.pixabay.com/photo/2016/10/27/08/11/cook-1773638__340.png'
    },
    facebookUrl:{
      type: String
    },
    twitterUrl:{
      type: String
    },
    youtubeUrl:{
      type: String
    },
    twitchUrl:{
      type: String
    },
    printerestUrl:{
      type: String
    },
    instagramUrl:{
      type: String
    },
    websitetURL:{
      type: String
    },
    location:{
      type: String
    },
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model('Profile', profileSchema)

export default Profile