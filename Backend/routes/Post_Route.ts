// This code is a Node.js module that defines a router for handling various post-related routes.

// Import the 'express2' library and assign it to the variable 'express2'
const express2 = require('express');

// Create a new router using the 'express2' library
const router1 = express2.Router();

// Import the 'Post_Functions' controller module, which contains functions for handling post-related tasks
const Post_Functions = require("../controller/post")

// Define routes for different post-related functionalities

// Route for creating a new post
router1.post('/create_post', Post_Functions.createPost)

// Route for getting posts that are not yet approved
router1.get('/get_not_approved_posts', Post_Functions.getNotApprovedPosts)

// Route for handling approval of not approved posts
router1.post('/approvel', Post_Functions.getNotApprovedPostsHandle)

// Route for getting all posts
router1.get('/getPosts', Post_Functions.getPosts)

// Route for getting rejected posts
router1.post('/getrejectposts', Post_Functions.getrejectposts)

// Route for deleting a post
router1.post('/deletepost', Post_Functions.deletepost)

// Route for commenting on a post
router1.post('/commentPost', Post_Functions.commentPost)

// Route for searching for posts
router1.post('/SearchPost', Post_Functions.SearchPost)

// Export the router so that it can be used in other parts of the application
module.exports = router1;
