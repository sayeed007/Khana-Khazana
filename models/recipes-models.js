import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  author: {
    required: true,
    type: String
  },
  activeTime: {
    required: true,
    type: String
  },
  totalTime: {
    required: true,
    type: String
  },
  thumbnail: {
    required: true,
    type: String
  },
  image: {
    required: true,
    type: String
  },
  category: {
    required: true,
    type: String
  },
  serves: {
    required: true,
    type: Number
  },
  rating: {
    required: true,
    type: Number
  },
});


export const recipeModel = mongoose?.models?.recipes ?? mongoose.model("recipes", schema);
