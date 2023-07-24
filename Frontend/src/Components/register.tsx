// Importing necessary modules and components
import { useState, FormEvent } from 'react'; // Importing necessary modules from 'react' library
import { Button, Form, FormControl } from 'react-bootstrap'; // Importing necessary components from 'react-bootstrap' library
import '../assets/css/Style.css'; // Importing the CSS file for styling
import axios from 'axios'; // Importing the axios library to make HTTP requests

// RegisterForm component for the registration form
const RegisterForm = () => {
  const backend_url = 'http://127.0.0.1:8080/'; // Backend URL for making API requests
  const [username, setUsername] = useState(''); // State variable to store the user's username
  const [Useremail, SetUseremail] = useState(''); // State variable to store the user's email
  const [password, setPassword] = useState(''); // State variable to store the user's password

  // Function to handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    axios.post(`${backend_url}signin`,{
      email: Useremail, // Send the user's username, email, and password to the backend for registration
      password: password,
      name : username
    })
    .then((result) => {
      alert(result.data); // Show the registration success message returned from the backend
      setPassword(''); // Clear the password input field
      setUsername(''); // Clear the username input field
      SetUseremail(''); // Clear the email input field
    })
    .catch((err) => {
      console.log(err); // Log any errors that occur during the API request
    });
  };

  return (
    // Registration form using Form and FormControl components from react-bootstrap
    <Form className='form' onSubmit={handleSubmit}>
      <h1 id='heading'>Register </h1>
      <FormControl
        className='field'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      /> <br/>

      <FormControl
        className='field'
        type="email"
        placeholder="Email Address"
        value={Useremail}
        onChange={(event) => SetUseremail(event.target.value)}
      /> <br/>
      
      <FormControl
        className='field'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      /> <br/>
      
      <Button className="btn" type="submit">
        SignIn
      </Button>
    </Form>
  );
};

export default RegisterForm;
