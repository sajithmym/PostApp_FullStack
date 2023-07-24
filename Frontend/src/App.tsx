// Importing necessary modules and components
import './App.css'; // Importing App.css file for styling
import LoginForm from './Components/login'; // Importing the LoginForm component for the login page
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Importing necessary components from 'react-router-dom'
import RegisterForm from './Components/register'; // Importing the RegisterForm component for the registration page
import Home from './Components/home'; // Importing the Home component for the main home page
import Approvel from './Components/Aprovel'; // Importing the Approvel component for the approved posts page
import RejectPost from './Components/reject_posts'; // Importing the RejectPost component for the rejected posts page

function App() {
  // This is the main App component that renders the entire application

  return (
    <div>
      <BrowserRouter>
        {/* Using BrowserRouter to handle client-side routing */}

        <Routes>
          {/* Defining different routes using the Routes component */}
          {/* Each route maps a specific URL path to a corresponding component */}

          {/* Route for the home page */}
          <Route path="/">
            {/* This is the default route for the home page */}
            <Route index element={<Home />} />
            {/* The 'index' attribute means this route will be used as the default route for the home page */}
            {/* It renders the Home component when the URL path matches the root path '/' */}
            
            <Route path="/log" element={<LoginForm />} />
            {/* Route for the login page */}
            {/* It renders the LoginForm component when the URL path is '/log' */}
            
            <Route path="/reg" element={<RegisterForm />} />
            {/* Route for the registration page */}
            {/* It renders the RegisterForm component when the URL path is '/reg' */}
            
            <Route path="/Approvel" element={<Approvel />} />
            {/* Route for the approved posts page */}
            {/* It renders the Approvel component when the URL path is '/Approvel' */}
            
            <Route path="/RejectPost" element={<RejectPost />} />
            {/* Route for the rejected posts page */}
            {/* It renders the RejectPost component when the URL path is '/RejectPost' */}
            
            <Route path="/" element={<Home />} />
            {/* This is a fallback route for the home page */}
            {/* It renders the Home component when the URL path is '/' */}
            {/* If none of the above routes match, this route will be used as the default */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
