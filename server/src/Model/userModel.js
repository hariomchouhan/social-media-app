import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    about: {
      type: String,
    },
    livesin: {
      type: String,
    },
    workAt: {
      type: String,
    },
    relationship: {
      type: String,
    },
    about: {
      type: String,
    },
    followers: [],
    following: [],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
