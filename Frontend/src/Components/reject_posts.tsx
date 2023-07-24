// Importing necessary modules and components
import axios from "axios"; // Importing axios library to make HTTP requests
import React, { useEffect, useState } from "react"; // Importing necessary modules from 'react' library

// RejectPost component for displaying rejected posts
export default function RejectPost() {
  const storedDetails = localStorage.getItem("info-sajithmym"); // Retrieving user details from local storage
  const Details = JSON.parse(storedDetails); // Parsing the user details
  const [posts, setPosts] = useState([]); // State variable to store the rejected posts

  const backend_url = "http://127.0.0.1:8010/"; // Backend URL for making API requests

  // Function to fetch rejected posts from the backend
  const posting = () => {
    axios
      .post(`${backend_url}getrejectposts`, {
        id: Details.id, // Send user's ID to get their rejected posts
      })
      .then((result) => {
        setPosts(result.data.posts); // Update state with received rejected posts
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the API request
      });
  };

  // useEffect hook to fetch rejected posts on component mount
  useEffect(() => {
    posting();
  }, []);

  return (
    <div>
      <h1>Your Rejected Posts</h1>
      <center>
        <div className="container">
          {posts.length === 0 ? (
            // If no rejected posts found, display a message
            <div>
              <h2>No posts found</h2>
            </div>
          ) : (
            // If rejected posts are found, display them
            posts.map((post, index) => (
              <div id={`single`} key={index}>
                <h2>{index + 1}) Your Post</h2>
                <h2>
                  <u>{post.title}</u>
                </h2>
                <h6>{post.content}</h6>
                <h3>
                  Admin Feedback : <br /> {post.comment} {/* Display admin's feedback on the rejected post */}
                </h3>
              </div>
            ))
          )}
        </div>
      </center>
    </div>
  );
}
