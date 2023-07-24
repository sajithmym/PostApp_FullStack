// This code is a Node.js module that defines a router for handling user-related routes.

// Import the 'express3' library and assign it to the variable 'express3'
const express3 = require('express');

// Create a new router using the 'express3' library
const router2 = express3.Router();

// Import the 'User_Functions' controller module, which contains functions for handling user-related tasks
const User_Functions = require("../controller/user")

// Define a single route for user signin functionality

// Route for user signin
router2.post("/signin", User_Functions.signin)

// Export the router so that it can be used in other parts of the application
module.exports = router2;
