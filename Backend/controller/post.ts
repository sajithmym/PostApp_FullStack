// Import the required models
const Post_DB_Control = require("../models/Post_control");
const Post_DB = require("../models/PostDB");
const Reject_Post_DB = require("../models/reject_Post");

// Function to create a new post or send it for approval
exports.createPost = async (req: any, res: any, next: any) => {
  // Extract data from the request body
  const title = req.body.title;
  const content = req.body.content;
  const creator = req.body.creator;
  const The_Name = req.body.name;

  try {
    // Check if the user is an admin or a normal user
    if (req.body.user === "Admin") {
      // If the user is an admin, create a new post in the approved collection
      const post = new Post_DB({
        title: title,
        content: content,
        creator: creator,
        name: The_Name,
        comments: [],
      });
      post.save();
      res.json({
        message: "Your Post is Published...",
      });
    } else {
      // If the user is not an admin, create a new post in the approval queue collection
      const post = new Post_DB_Control({
        title: title,
        content: content,
        creator: creator,
        name: The_Name,
      });
      await post.save();
    }

    res.json({
      message: "Your Post is Sent to the admin for Approval...",
    });
  } catch (err) {
    console.log(err);
  }
};

// Function to get posts that are waiting for approval
exports.getNotApprovedPosts = async (req: any, res: any, next: any) => {
  try {
    const posts = await Post_DB_Control.find();

    res.status(200).json({
      message: "Fetched posts successfully.",
      posts: posts,
    });
  } catch (err: any) {
    console.log(err);
  }
};

// Function to handle the approval or rejection of a post
exports.getNotApprovedPostsHandle = async (req: any, res: any, next: any) => {
  try {
    const whatdo = req.body.what;
    const id = req.body.id;

    if (whatdo === "ok") {
      // If the post is approved, move it to the approved collection and remove it from the approval queue
      const post = await Post_DB_Control.findById(id);
      const new_post = new Post_DB({
        title: post.title,
        content: post.content,
        creator: post.creator,
        name: post.name,
        comments: [],
      });
      new_post.save();
      await Post_DB_Control.findByIdAndRemove(id);
      res.json({ msg: "Post Approved Successfully" });
    } else {
      // If the post is rejected, move it to the rejected collection with a rejection comment and remove it from the approval queue
      const msg = req.body.message;
      const post = await Post_DB_Control.findById(id);
      const reject_post = new Reject_Post_DB({
        title: post.title,
        content: post.content,
        creator: post.creator,
        name: post.name,
        comment: msg,
      });
      reject_post.save();
      await Post_DB_Control.findByIdAndRemove(id);
      res.json({ msg: "Post Deleted Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to get posts from the approved collection
exports.getPosts = async (req: any, res: any, next: any) => {
  try {
    const posts = await Post_DB.find();

    res.status(200).json({
      message: "Fetched posts successfully.",
      posts: posts,
    });
  } catch (err: any) {
    console.log(err);
  }
};

// Function to get rejected posts for a specific user
exports.getrejectposts = async (req: any, res: any, next: any) => {
  const id = req.body.id;
  try {
    const posts = await Reject_Post_DB.find({ creator: id });
    res.status(200).json({
      posts: posts,
    });
  } catch (err: any) {
    console.log(err);
  }
};

// Function to delete a post from the approved collection
exports.deletepost = async (req: any, res: any, next: any) => {
  const id = req.body.id;
  try {
    await Post_DB.findByIdAndRemove(id);
    res.json({
      message: "Post Deleted Successfully...",
    });
  } catch (err: any) {
    console.log(err);
  }
};

// Function to add a comment to a post in the approved collection
exports.commentPost = async (req: any, res: any, next: any) => {
  const comment = req.body.comment;
  const id = req.body.id;
  const name = req.body.name;
  try {
    const post = await Post_DB.findById(id);
    const List = post.comments;

    List.push({
      comment: comment,
      name: name,
    });

    await Post_DB.updateOne({ _id: id }, {
      comments: List,
    });

    res.json({
      message: "Comment added successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to search for posts in the approved collection based on a provided text
exports.SearchPost = async (req: any, res: any, next: any) => {
  const txt = req.body.msg;

  try {
    const posts = await Post_DB.find({
      $or: [
        { name: { $regex: new RegExp(txt, "i") } },
        { title: { $regex: new RegExp(txt, "i") } },
      ],
    });

    res.json({
      posts: posts,
    });
  } catch (error) {
    // Handle any errors that might occur during the search
    res.status(500).json({ error: "Internal server error" });
  }
};
