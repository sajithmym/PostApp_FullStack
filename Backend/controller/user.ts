// Import the required models and library
const The_user = require("../models/UserDB");
const bcrypt_user = require("bcryptjs");

// Define the signin function to handle user signup and create a new user
exports.signin = async (req: any, res: any, next: any) => {
  // Extract email, name, and password from the request body
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  try {
    // Check if a user with the provided email already exists in the database
    const find = await The_user.findOne({ email: email });
    if (find) {
      res.send("This Email Address is Already Exist.");
      const error = new Error("A user with this email could not be found.");
      throw error;
    }

    // Hash the user's password using bcrypt with a cost factor of 12
    const hashedPw = await bcrypt_user.hash(password, 12);

    // Create a new user instance with the provided email, hashed password, and name
    const user = new The_user({
      email: email,
      password: hashedPw,
      name: name,
    });

    // Save the new user in the database
    const result = await user.save();

    // Send a success response indicating that the user was created successfully
    res.send("User Created Successfully");
  } catch (err) {
    console.log(err); // Log any caught errors to the console
  }
};
