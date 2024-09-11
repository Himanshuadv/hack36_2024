import axios from "axios";

// Function to get all posts
export async function getAllPost() {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/users/posts/all",
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    return data;
  } catch (error) {
    console.error("Error loading posts:", error);
    throw new Error("Posts could not be loaded");
  }
}

// Function to update likes
export async function updateLikes(postId) {
  try {
    const userId = localStorage.getItem("id");
    console.log("here");

    const { data } = await axios.put(
      `http://localhost:3000/api/v1/users/posts/${postId}/likes`,
      { userId },
      { withCredentials: true, credentials: "include" }
    );

    console.log("happening");
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error updating likes:", error);
    throw new Error("Error occurred while updating likes");
  }
}
