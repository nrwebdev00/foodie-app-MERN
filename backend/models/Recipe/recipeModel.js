import mongoose from "mongoose";

const recipeImagesSchema = mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    caption:{
      type: String,
    },
    imgAlt:{
      type: String,
      default: 'Image Desc'
    },
    imgUrl:{
      type: String,
    },
    img:{
      type: String,
      required: True,
    }
  },
  {
    timestamps: true,
  }
)

const recipeIngredients = mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    ingredientName:{
      type: String,
      required: true,
    },
    ingredientAmount:{
      type: String,
      required: true,

    },
    ingredientMeasureBy:{
      type: mongoose.Types.Decimal128,
      required: true,
      default: 'each'
    },
  },
  {
    timestamps: true,
  }
)

const recipeDirections = mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    directionShort:{
      type: String,
      required: true
    },
    directionLong:{
      type: String,
    },
    directionStep:{
      type: Number,
      require: true,
      default: 1,
    },
    timeToCompleteDirection:{
      type: Number,
      required: true,
      default: 1
    },
  },
  {
    timestamps: true
  }
)

const recipeCourses = mongoose.Schema(
  {
    name:{
      type: String,
      required: true
    }
  }
)

const recipeHolidays = mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    }
  }
)

const recipeCuisine = mongoose.Schema(
  {
    name:{
      type: String,
      required: true
    }
  }
)

const recipeSchema = mongoose.Schema(
  {
    user:{
      user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
    title:{
      type: String,
      required: true,
    },
    desc:{
      type: String,
      required: true,
    },
    mainImage:{
      type: String,
      required: true,
    },
    images:[recipeImagesSchema],
    ingredients:[recipeIngredients],
    directions:[recipeDirections],
    courses:[recipeCourses],
    holidays:[recipeHolidays],
    cuisine:[recipeCuisine],
  }
)

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe