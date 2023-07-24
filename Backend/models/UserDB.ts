// Import the 'mongoose' library, which is a popular MongoDB library for Node.js
const mongoose3 = require("mongoose");

// Create a new Mongoose schema using the 'Schema' class from 'mongoose'
const Schema3 = mongoose3.Schema;

// Define the Mongoose schema for the 'User' collection
const userSchema = new Schema3({
  // Define the 'email' field in the schema
  email: {
    type: String,     // The 'email' field should be of type 'String'
    required: true,   // It is required and must be provided when creating a new user document
  },

  // Define the 'password' field in the schema
  password: {
    type: String,     // The 'password' field should be of type 'String'
    required: true,   // It is required and must be provided when creating a new user document
  },

  // Define the 'name' field in the schema
  name: {
    type: String,     // The 'name' field should be of type 'String'
    required: true,   // It is required and must be provided when creating a new user document
  },

  // Define the 'posts' field in the schema
  posts: [
    {
      type: Schema3.Types.ObjectId,  // The 'posts' field is an array of ObjectIds that reference 'Post' documents
      ref: 'Post'                   // The 'ref' option specifies that the ObjectIds reference the 'Post' model
    }
  ]
});

// Export the Mongoose model 'User' with the defined schema
module.exports = mongoose3.model('User', userSchema);
