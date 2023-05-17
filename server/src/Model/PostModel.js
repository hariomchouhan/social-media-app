import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: String,
    likes: [],
    image: String,
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.model("post", postSchema);
