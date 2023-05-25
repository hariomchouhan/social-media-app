import mongoose from "mongoose";
import { PostModel } from "../Model/PostModel.js";
import { UserModel } from "../Model/userModel.js";

// Create new Post
export const createPost = async (request, response) => {
  try {
    const newPost = await PostModel(request.body);

    await newPost.save();
    response.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    response.status(500).json();
  }
};

// Get a Post
export const getPost = async (request, response) => {
  try {
    const id = request.params.id;

    const post = await PostModel.findById(id);
    response.status(200).json(post === null ? "Not available" : post);
  } catch (error) {
    console.log(error);
    response.status(500).json();
  }
};

// Update a Post
export const updatePost = async (request, response) => {
  try {
    const postId = request.params.id;
    const { userId } = request.body;

    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      const updatePost = await post.updateOne({ $set: request.body });
      response.status(200).json("Post successfully updated!", updatePost);
    } else {
      response.status(403).json("Action forbidden");
    }
  } catch (error) {
    console.log(error);
    response.status(500).json();
  }
};

// Delete a Post
export const deletePost = async (request, response) => {
  try {
    const id = request.params.id;
    const { userId } = request.body;

    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      response.status(200).json("Post successfully deleted!");
    } else {
      response.status(403).json("Action forbidden");
    }
  } catch (error) {
    console.log(error);
    response.status(500).json();
  }
};

// Like/dislike a post
export const likePost = async (request, response) => {
  try {
    const id = request.params.id;
    const { userId } = request.body;

    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      response.status(200).json("Post Liked!");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      response.status(200).json("Post Unliked!");
    }
  } catch (error) {
    console.log(error);
    response.status(500).json();
  }
};

// Get Timeline of a post
export const getTimelinePosts = async (request, response) => {
  try {
    const userId = request.params.id;

    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    response.status(200).json(currentUserPosts.concat(...followingPosts)
    .sort((a, b) => {
        return b.createdAt - a.createdAt;
    }));
  } catch (error) {
    console.log(error);
    response.status(500).json();
  }
};
