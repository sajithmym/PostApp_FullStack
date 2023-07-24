// Import the 'mongoose' library, which is a popular MongoDB library for Node.js
const mongoose1 = require('mongoose');

// Create a new Mongoose schema using the 'Schema' class from 'mongoose1'
const Schema = mongoose1.Schema;

// Define the Mongoose schema for the 'Admin' collection
const AdminSchema = new Schema({
  // Define the 'email' field in the schema
  email: {
    type: String,     // The 'email' field should be of type 'String'
    required: true    // It is required and must be provided when creating a new admin document
  },

  // Define the 'password' field in the schema
  password: {
    type: String,     // The 'password' field should be of type 'String'
    required: true    // It is required and must be provided when creating a new admin document
  },

  // Define the 'posts' field in the schema
  posts: [
    {
      type: Schema.Types.ObjectId,  // The 'posts' field is an array of ObjectIds that reference 'Post' documents
      ref: 'Post'                  // The 'ref' option specifies that the ObjectIds reference the 'Post' model
    }
  ],
});

// Export the Mongoose model 'Admin' with the defined schema
module.exports = mongoose1.model('Admin', AdminSchema);
