// Import the 'mongoose' library, which is a popular MongoDB library for Node.js
const mongoose_Pc = require("mongoose");

// Create a new Mongoose schema using the 'Schema' class from 'mongoose_Pc'
const Schema_pc = mongoose_Pc.Schema;

// Define the Mongoose schema for the 'Post_control' collection
const PostControlSchema = new Schema_pc(
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

    // Define the 'creator' field in the schema
    creator: {
      type: Schema_pc.Types.ObjectId,  // The 'creator' field is of type 'ObjectId' that references 'User' documents
      ref: "User",                    // The 'ref' option specifies that the ObjectId references the 'User' model
      required: true,                 // It is required and must be provided when creating a new document
    },

    // Define the 'name' field in the schema
    name: {
      type: String,
      require: false   // The 'name' field is of type 'String' and is not required when creating a new document
    }
  },
  { timestamps: true }   // The 'timestamps' option automatically adds 'createdAt' and 'updatedAt' fields to the document
);

// Export the Mongoose model 'Post_control' with the defined schema
module.exports = mongoose_Pc.model("Post_control", PostControlSchema);
