// Importing necessary modules and components
import axios from "axios"; // Importing the axios library to make HTTP requests
import { useState, useEffect } from "react"; // Importing necessary modules from 'react' library
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from 'react-router-dom' for navigation

// Home component for the main home page
export default function Home() {
  const Go = useNavigate(); // Creating a navigate function using useNavigate hook for navigation
  const backend_url = "http://127.0.0.1:8080/"; // Backend URL for making API requests
  const [username, setUsername] = useState(""); // State variable to store the username
  const [Search, setSearch] = useState<JSX.Element | null>(null); // State variable to manage the search bar
  const [click, setClick] = useState(false); // State variable to manage search bar visibility

  // Getting user details from local storage and storing in state variable
  const storedDetails = localStorage.getItem("info-sajithmym");
  const Details = JSON.parse(storedDetails);

  const [posts, setPosts] = useState([]); // State variable to store the list of posts

  const [adminApprove, setadminApprove] = useState(<p></p>); // State variable to store admin approval component

  // Function to navigate to the "Not Approved Posts" page
  const Navigate = () => {
    Go("/Approvel");
  };

  // Function to navigate to the "Reject Posts" page
  const NavigateReject = () => {
    Go("/RejectPost");
  };

  // Function to check if the user is logged in or not
  const CheckLog = () => {
    const storedDetails = localStorage.getItem("info-sajithmym");
    const Details = JSON.parse(storedDetails);
    if (!storedDetails) {
      Go("/log"); // If user is not logged in, navigate to the login page
    } else {
      setUsername(` ---> Welcome ${Details.name} ${Details.user} <---`); // Set the username state with the user's name and role
      if (Details.user === "Admin") {
        // If user is an admin, show "Not Approved Posts" button
        setadminApprove(
          <div>
            <button onClick={() => Navigate()}>Not Approved Posts</button>
          </div>
        );
      } else {
        // If user is not an admin, show "Reject Posts" button
        setadminApprove(
          <div>
            <button onClick={() => NavigateReject()}>Reject Posts</button>
          </div>
        );
      }
    }
  };

  // useEffect hook to check login status and fetch posts when the component mounts
  useEffect(() => {
    CheckLog(); // Check if the user is logged in or not
    axios
      .get(`${backend_url}getPosts`)
      .then((result) => {
        setPosts(result.data.posts); // Update state with received posts
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the API request
      });
  }, []);

  // Function to handle search bar visibility and search posts
  const open = () => {
    const search = (
      <div>
        <input
          id="text"
          type="text"
          placeholder="Post Title or The user name"
          className="search" // Class name preserved
        />
        <button onClick={handleSearch} id="btn">
          Search
        </button>
      </div>
    );

    if (!click) {
      setClick(true); // If search bar is closed, set click state to true to open it
      setSearch(search); // Set the search bar component to display
    } else {
      setClick(false); // If search bar is open, set click state to false to close it
      setSearch(null); // Remove the search bar component from display
    }
  };

  // Function to handle search posts based on user input
  const handleSearch = () => {
    const text = document.querySelector(".search"); // Get the value from the search input
    axios
      .post(
        `${backend_url}SearchPost`,
        {
          msg: text?.value, // Send user input as the search query to the backend
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        setPosts(result.data.posts); // Update state with the search results (matching posts)
        text.value = ""; // Clear the search input field
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the API request
      });
    setClick(false); // Close the search bar after search is performed
    setSearch(null); // Remove the search bar component from display
  };

  // Function to handle opening the post creation form
  const openPost = () => {
    const postForm = (
      <div id="postAdd">
        <input
          id="postText"
          placeholder="Enter Title of the Post Here"
          type="text"
          className="post_title" // Class name preserved
        />
        <textarea
          className="post_Content" // Class name preserved
          placeholder="Enter Content of the Post Here"
        ></textarea>
        <br />
        <button onClick={handlePost} id="btn">
          Click When Done
        </button>
      </div>
    );

    if (!click) {
      setClick(true); // If post form is closed, set click state to true to open it
      setSearch(postForm); // Set the post form component to display
    } else {
      setClick(false); // If post form is open, set click state to false to close it
      setSearch(null); // Remove the post form component from display
    }
  };

  // Function to handle creating a new post
  const handlePost = () => {
    const storedDetails = localStorage.getItem("info-sajithmym");
    const Details = JSON.parse(storedDetails);
    const title = document.querySelector(".post_title"); // Get the value from the post title input
    const content = document.querySelector(".post_Content"); // Get the value from the post content input

    const Data = {
      title: title?.value, // Get the post title
      content: content?.value, // Get the post content
      creator: Details.id, // Get the creator's id from the user details
      name: Details.name, // Get the creator's name from the user details
      user: Details.user, // Get the creator's role (user or admin) from the user details
    };

    axios
      .post(`${backend_url}create_post`, Data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        alert(result.data.message); // Show the message received from the backend
        title.value = ""; // Clear the post title input field
        content.value = ""; // Clear the post content input field
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the API request
      });
    setClick(false); // Close the post form after post creation
    setSearch(null); // Remove the post form component from display
    setTimeout(() => {
      window.location.href = ""; // Refresh the page to display the new post
    }, 500);
  };

  // Function to handle deleting a post with a given id
  const deletePost = (id: any) => {
    axios
      .post(
        `${backend_url}deletepost`,
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        alert(result.data.message); // Show the message received from the backend
        window.location.href = ""; // Refresh the page after post deletion
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the API request
      });
  };

  // Function to handle commenting on a post with a given id
  const commentPost = (id: any) => {
    const msg = prompt("Write a comment for this post..."); // Prompt the user to enter a comment
    axios
      .post(
        `${backend_url}commentPost`,
        {
          id: id,
          comment: msg, // Send the comment and user details to the backend
          name: Details.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        console.log("comment sent"); // Log a message if the comment is successfully sent
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the API request
      });
    setTimeout(() => {
      window.location.href = ""; // Refresh the page after commenting
    }, 100);
  };

  return (
    <div>
      <h4>{username}</h4> {/* Displaying the username */}
      <button id="item" onClick={openPost}>
        Add a Post
      </button> {/* Button to open the post creation form */}
      {adminApprove} {/* Displaying the "Not Approved Posts" or "Reject Posts" button based on user role */}
      <button id="item" onClick={open}>
        Search Post
      </button> {/* Button to open the search bar */}

      <h1>{Search}</h1> {/* Displaying the search bar component */}

      <h1>
        <u>Posts</u>
      </h1> {/* Heading for the posts section */}

      <center>
        <div className="container">
          {posts.length === 0 ? ( // Conditional rendering based on the number of posts
            <div>
              <h2>No posts found</h2> {/* Message when no posts are available */}
            </div>
          ) : (
            // Mapping through the list of posts and rendering each post
            posts.map((post, index) => (
              <div id={`single`} key={index}> {/* Div for each post */}
                <h2>
                  {index + 1}) {post.name}'s Post {/* Post number and author's name */}
                </h2>
                <h2>
                  <u>{post.title}</u> {/* Title of the post */}
                </h2>
                <h6>{post.content}</h6> {/* Content of the post */}
                {post.creator === Details.id || Details.user === "Admin" ? (
                  <button onClick={() => deletePost(post._id)}>Delete</button>
                ) : (
                  <p></p>
                )} {/* Button to delete the post (visible to the post creator and admin) */}
                <button id="comment" onClick={() => commentPost(post._id)}>
                  Write a Comment
                </button> {/* Button to write a comment on the post */}
                <h3>All Comments</h3> {/* Heading for the comments section */}
                <div id="comments">
                  {post.comments.map((element: any, index: any) => (
                    <h5 key={index}>
                      {element.name}'s comment : {element.comment}
                    </h5>
                  ))} {/* Displaying all comments on the post */}
                </div>
              </div>
            ))
          )}
        </div>
      </center>
    </div>
  );
}
