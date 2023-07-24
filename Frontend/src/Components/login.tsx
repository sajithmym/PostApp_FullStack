// Importing necessary modules and components
import { useState, FormEvent } from "react"; // Importing necessary modules from 'react' library
import { Button, Form, FormControl } from "react-bootstrap"; // Importing necessary components from 'react-bootstrap' library
import "../assets/css/Style.css"; // Importing the CSS file for styling
import axios from "axios"; // Importing the axios library to make HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from 'react-router-dom' for navigation

// LoginForm component for the login form
const LoginForm = () => {
  const Go = useNavigate(); // Creating a navigate function using useNavigate hook for navigation
  const backend_url = 'http://127.0.0.1:8010/'; // Backend URL for making API requests
  const [useremail, setUseremail] = useState(""); // State variable to store the user's email
  const [password, setPassword] = useState(""); // State variable to store the user's password

  // Function to handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    axios
      .post(
        `${backend_url}admin/login`,
        {
          email: useremail, // Send the user's email and password to the backend for login authentication
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data; // Get the response data from the backend

        // Check if the login is successful or not
        if (data[0] !== "user" && data[0] !== "Admin") {
          // If login is unsuccessful, show the error message returned from the backend
          alert(data[0]);
        } else {
          // If login is successful, store the user details in local storage and navigate to the home page
          const details = {
            user: data[0], // User role (user or admin)
            id: data[1], // User id
            name: data[2], // User name
            email: data[3], // User email
          };
          // console.log(details); // Log the user details (for testing purposes)
          localStorage.setItem("info-sajithmym", JSON.stringify(details)); // Store the user details in local storage
          Go('/'); // Navigate to the home page
        }
      })
      .catch((error) => {
        console.error("Error sending post request:", error); // Log any errors that occur during the API request
      });
  };

  return (
    // Login form using Form and FormControl components from react-bootstrap
    <Form className="form" onSubmit={handleSubmit}>
      <h1 id="heading">Login Form</h1>
      <FormControl
        className="field"
        type="email"
        placeholder="Email Address"
        value={useremail}
        onChange={(event) => setUseremail(event.target.value)}
      />{" "}
      <br />
      <FormControl
        className="field"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />{" "}
      <br />
      <Button className="btn" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
