// This code is a Node.js module that defines a router for handling admin-related routes.

// Import the 'express' library and assign it to the variable 'express1'
const express1 = require('express');

// Create a new router using the 'express1' library
const router = express1.Router();

// Import the 'Admin' controller module, which contains the functions for handling admin-related tasks
const Admin_Functions = require("../controller/Admin")

// Define a route for handling the login functionality
// When a POST request is made to '/login', the 'login' function from the 'Admin_Functions' module will be executed
router.post("/login", Admin_Functions.login)

// Export the router so that it can be used in other parts of the application
module.exports = router;
