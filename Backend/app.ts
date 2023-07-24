// Importing required modules and packages
const express = require("express"); // Importing Express web framework
const bodyParser = require("body-parser"); // Middleware to parse request bodies
const mongoose = require("mongoose"); // MongoDB Object Modeling tool
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const cors = require('cors'); // Middleware for enabling CORS (Cross-Origin Resource Sharing)

// Importing MongoDB models and routes
const Admin = require("./models/Admin_DB"); // Importing the Admin model
const Admin_Route = require("./routes/Admin_Route"); // Importing Admin routes
const Post_Route = require("./routes/Post_Route"); // Importing Post routes
const User_Route = require("./routes/User_Route"); // Importing User routes

const app = express(); // Initializing Express application
app.use(bodyParser.json()); // Configuring Express to use JSON as the request body parser

const database_url = "mongodb://127.0.0.1:27017/project-db"; // MongoDB URL for connecting to the database

app.use(cors()); // Enabling CORS for cross-origin requests

// Setting up CORS headers for response
app.use((req:any, res:any, next:any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Setting up routes for different endpoints
app.use("/admin", Admin_Route); // Admin routes will be prefixed with "/admin"
app.use('', User_Route); // User routes will be without a prefix
app.use('', Post_Route); // Post routes will be without a prefix

// Connect to the MongoDB database
mongoose
  .connect(database_url)
  .then((result: any) => {

    // Check if admin details exist. If they do not, add details.
    Admin.findOne({ email: "sajith@admin.com" }).then( async (result: any) => {
      if (!result) {
        const hashedPw = await bcrypt.hash("123", 12);
        // admin document field values
        const admin = new Admin({
          email: "sajith@admin.com",
          password: hashedPw,
        });
        admin.save(); // save to db
      }

    });

    // listen a server port
    const server = app.listen(8080, () =>
      console.log("DB Connected, Server : http://127.0.0.1:8080")
    );
  })
  .catch((err: any) => console.log(err));
