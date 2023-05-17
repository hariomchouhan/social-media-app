import { UserModel } from "../Model/userModel.js";
import bcrypt from "bcrypt";

// get a User
export const getUser = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;
      response.status(200).json(otherDetails);
    } else {
      response.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    response.status(500).json();
  }
};

// update a user
export const updateUser = async (request, response) => {
  try {
    const id = request.params.id;
    const { currentUserId, currentUserAdminStatus, password } = request.body;

    if (id === currentUserId || currentUserAdminStatus) {
      if (password) {
        const newPassword = await bcrypt.hashSync(request.body.password, 12);
        request.body["password"] = newPassword;
      }
      const user = await UserModel.findByIdAndUpdate(id, request.body, {
        new: true,
      });
      response.status(200).json(user);
    } else {
      response
        .status(403)
        .json("Access denied! you can only update your own profile.");
    }
  } catch (error) {
    console.log(error);
    response.status(500).json();
  }
};

// Delete user

export const deleteUser = async (request, response) => {
  try {
    const id = request.params.id;

    const { currentUserId, currentUserAdminStatus } = request.body;

    if (id === currentUserId || currentUserAdminStatus) {
      await UserModel.findByIdAndDelete(id, request.body);
      response.status(200).json("User deleted successfully");
    } else {
      response
        .status(403)
        .json("Access denied! you can only update your own profile.");
    }
  } catch (error) {
    console.log(error);
    response.status(500).json();
  }
};

// Follow user
export const followUser = async (request, response) => {
  const id = request.params.id;

  const { currentUserId } = request.body;

  if (id === currentUserId) {
    response.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers || !followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        response.status(200).json("User followed!");
      } else {
        response.status(403).json("User is already followed by you");
      }
    } catch (error) {
      console.log(error);
      response.status(500).json();
    }
  }
};

// UnFollow user
export const unFollowUser = async (request, response) => {
  const id = request.params.id;

  const { currentUserId } = request.body;

  if (id === currentUserId) {
    response.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (followUser.followers || followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        response.status(200).json("User UnFollowed!");
      } else {
        response.status(403).json("User is not followed by you");
      }
    } catch (error) {
      console.log(error);
      response.status(500).json();
    }
  }
};