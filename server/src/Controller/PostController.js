import { PostModel } from "../Model/PostModel.js"


// Create new Post
export const createPost = async(request, response) => {
    try {
        const newPost = await PostModel(request.body);

        await newPost.save();
        response.status(200).json("Post successfully created!")
    } catch (error) {
        console.log(error);
        response.status(500).json();
    }
}

// Get a Post
export const getPost = async(request, response) => {
    try {
        const  id = request.params.id;

        const post = await PostModel.findById(id);
        response.status(200).json( post === null ? "Not available" : post);
    } catch (error) {
        console.log(error);
        response.status(500).json();
    }
}

// Update a Post
export const updatePost = async(request, response) => {
    try {
        const postId = request.params.id;
        const {userId} = request.body;

        const post = await PostModel.findById(postId);
        if(post.userId === userId) {
            await post.updateOne({ $set: request.body });
            response.status(200).json("Post successfully updated!");
        }
        else {
            response.status(403).json("Action forbidden");
        }
    } catch (error) {
        console.log(error);
        response.status(500).json();
    }
}

// Delete a Post
export const deletePost = async(request, response) => {
    try {
        const id = request.params.id;
        const {userId} = request.body;

        const post = await PostModel.findById(id);
        if(post.userId === userId) {
            await post.deleteOne();
            response.status(200).json("Post successfully deleted!");
        }
        else {
            response.status(403).json("Action forbidden");
        }
    } catch (error) {
        console.log(error);
        response.status(500).json();
    }
}

// Like/dislike a post
export const likePost = async(request, response) => {
    try {
        const id = request.params.id;
        const {userId} = request.body;

        const post = await PostModel.findById(id);
        if(!post.likes.includes(userId)) {
            await post.updateOne({$push: {likes: userId}});
            response.status(200).json("Post Liked!");
        }
        else {
            await post.updateOne({$pull: {likes: userId}});
            response.status(200).json("Post Unliked!");
        }
    } catch (error) {
        console.log(error);
        response.status(500).json();
    }
}