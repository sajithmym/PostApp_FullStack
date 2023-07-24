// Importing necessary modules and components
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap"; // Importing Navbar and Nav components from 'react-bootstrap' library
import "../assets/css/Style.css"; // Importing custom CSS styles from Style.css file

// Navbar component for the application
const Navbar = () => {
  // Function to handle navigation when a link is clicked
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (url:any) => {
    // Use window.location.href to change the URL and navigate to the given 'url'
    window.location.href = url;
  };

  return (
    <div className="navbar"> {/* The main container div for the Navbar */}
      <BootstrapNavbar bg="dark" variant="dark" expand="lg"> {/* Using BootstrapNavbar component */}
        <BootstrapNavbar.Brand href="#" onClick={() => handleClick("/")}>POSTAPP</BootstrapNavbar.Brand> {/* Brand link */}
        <BootstrapNavbar.Collapse id="basic-navbar-nav"> {/* Collapsible content */}
          <div id="links"> {/* Container div for the navigation links */}
            <Nav className="ml-auto" > {/* Nav component to display navigation links */}
              <Nav.Link id="links-item" onClick={() => handleClick("/")}>Home</Nav.Link> {/* Home link */}
              <Nav.Link id="links-item" onClick={() => handleClick("/reg")}>Signup</Nav.Link> {/* Signup link */}
              <Nav.Link id="links-item" onClick={() => handleClick("/log")}>SignIn</Nav.Link> {/* SignIn link */}
            </Nav>
          </div>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
