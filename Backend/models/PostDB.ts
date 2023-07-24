// Import the 'mongoose' library, which is a popular MongoDB library for Node.js
const mongoose2 = require("mongoose");

// Create a new Mongoose schema using the 'Schema' class from 'mongoose2'
const Schema2 = mongoose2.Schema;

// Define the Mongoose schema for the 'Post' collection
const PostSchema = new Schema2(
  {
    // Define the 'title' field in the schema
    title: {
      type: String,     // The 'title' field should be of type 'String'
      required: true,   // It is required and must be provided when creating a new document
    },

    // Define the 'content' field in the schema
    content: {
      type: String,     // The 'content' field should be of type 'String'
      required: true,   // It is required and must be provided when creating a new document
    },

    // Define the 'comments' field in the schema
    comments: [
      {
        comment: { type: String, required: false }, // Each comment has a 'comment' field of type 'String', which is not required
        name: { type: String, required: false },    // Each comment has a 'name' field of type 'String', which is not required
      }
    ],

    // Define the 'name' field in the schema
    name: {
      type: String,
      require: false   // The 'name' field is of type 'String' and is not required when creating a new document
    },

    // Define the 'creator' field in the schema
    creator: {
      type: Schema2.Types.ObjectId,  // The 'creator' field is of type 'ObjectId' that references 'User' documents
      ref: "User",                    // The 'ref' option specifies that the ObjectId references the 'User' model
      required: true,                 // It is required and must be provided when creating a new document
    },
  },
  { timestamps: true }   // The 'timestamps' option automatically adds 'createdAt' and 'updatedAt' fields to the document
);

// Export the Mongoose model 'Post' with the defined schema
module.exports = mongoose2.model("Post", PostSchema);
