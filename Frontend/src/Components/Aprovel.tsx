import axios from "axios"; // Importing the axios library to make HTTP requests
import React, { useEffect, useState } from "react"; // Importing necessary modules from 'react' library

// The Approvel component for displaying and managing not approved posts
export default function Approvel() {
  const [posts, setPosts] = useState([]); // State variable to store the list of not approved posts

  const backend_url = "http://127.0.0.1:8080/"; // Backend URL for making API requests

  // Function to fetch not approved posts from the backend and update the state
  const posting = () => {
    axios
      .get(`${backend_url}get_not_approved_posts`)
      .then((result) => {
        setPosts(result.data.posts); // Update state with the received posts
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the API request
      });
  };

  // useEffect hook to fetch not approved posts when the component mounts
  useEffect(() => {
    posting(); // Fetch not approved posts from the backend and update the state
  }, []);

  // Function to approve a post with a given id
  const approvel = (i: any) => {
    axios.post(`${backend_url}approvel`, {
      id: i,
      what: "ok",
    });
    window.location.href = ''; // Refresh the page after approving the post
  };

  // Function to reject a post with a given id and provide feedback message
  const reject = (i: any) => {
    const msg = prompt("Give feedback for rejecting this post...");
    axios.post(`${backend_url}approvel`, {
      id: i,
      what: "delete",
      message: msg,
    });
    window.location.href = ''; // Refresh the page after rejecting the post
  };

  return (
    <div>
      <h1>Not Approved Posts</h1> {/* Heading for the page */}
      <center>
        <div className="container">
          {posts.length === 0 ? ( // Conditional rendering based on the number of posts
            <div>
              <h2>No posts found</h2> {/* Message when no not approved posts are available */}
            </div>
          ) : (
            // Mapping through the list of not approved posts and rendering each post
            posts.map((post, index) => (
              <div id={`single`} key={index}> {/* Div for each post */}
                <h2>
                  {index + 1}) {post.name}'s Post {/* Post number and author's name */}
                </h2>
                <h2>
                  <u>{post.title}</u> {/* Title of the post */}
                </h2>
                <h6>{post.content}</h6> {/* Content of the post */}
                <button onClick={() => approvel(post._id)}>
                  Approve Post
                </button>{" "} {/* Button to approve the post */}
                <button onClick={() => reject(post._id)}>Reject Post</button> {/* Button to reject the post */}
              </div>
            ))
          )}
        </div>
      </center>
    </div>
  );
}
