// Import the 'bcrypt' library, which is used for password hashing and comparison
const bcrypt1 = require("bcryptjs");

// Import the 'Admin_user' and 'Normal_user' models
const Admin_user = require("../models/Admin_DB");
const Normal_user = require("../models/UserDB");

// Define the login function to handle user authentication
exports.login = async (req: any, res: any, next: any) => {
  // Extract email and password from the request body
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Check if the email or password fields are empty
    if (email === "" || password === "") {
      res.send(["Field is Empty"]); // Send response indicating that a field is empty
      return; // Exit the function to prevent further execution
    }

    // If the email is equal to the admin email, authenticate as admin
    if (email === "sajith@admin.com") {
      // Find the admin user with the provided email
      const user = await Admin_user.findOne({ email: email });

      // If no user found, send an error response
      if (!user) {
        res.send(["A user with this email could not be found."]);
        const error = new Error("A user with this email could not be found.");
        throw error;
      }

      // Compare the provided password with the hashed password stored in the database
      const isEqual = await bcrypt1.compare(password, user.password);

      // If the passwords don't match, send an error response
      if (!isEqual) {
        res.send(["Wrong password!"]);
        const error = new Error("Wrong password!");
        throw error;
      }

      // If the login is successful, send a response with the user type (admin), user ID, name, and email
      res.send(["Admin", user._id, "Sajith", "sajith@admin.com"]);
    } else {
      // For normal users, authenticate as a normal user
      // Find the normal user with the provided email
      const user = await Normal_user.findOne({ email: email });

      // If no user found, send an error response
      if (!user) {
        res.send(["A user with this email could not be found."]);
        const error = new Error("A user with this email could not be found.");
        throw error;
      }

      // Compare the provided password with the hashed password stored in the database
      const isEqual = await bcrypt1.compare(password, user.password);

      // If the passwords don't match, send an error response
      if (!isEqual) {
        res.send(["Wrong password!"]);
        const error = new Error("Wrong password!");
        throw error;
      }

      // If the login is successful, send a response with the user type (user), user ID, name, and email
      res.send(["user", user._id, user.name, user.email]);
    }
  } catch (err) {
    console.log(err); // Log any caught errors to the console
  }
};
