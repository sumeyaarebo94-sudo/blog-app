import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { createdPostsAtom } from "../atoms/bookmarkAtoms";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [, setCreatedPosts] = useAtom(createdPostsAtom);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      body,
      tags: [],
      reactions: {
        likes: 0,
      },
      commentCount: 0,
    };

    setCreatedPosts((prev) => {
      const updatedPosts = [newPost, ...prev];

      localStorage.setItem(
        "createdPosts",
        JSON.stringify(updatedPosts)
      );

      return updatedPosts;
    });

    setTitle("");
    setBody("");

    alert("Post created successfully!");

    navigate("/");
  }

  return (
    <div className="create-post">
      <h1>➕ Create New Post</h1>

      <form onSubmit={handleSubmit}>
        <label>Title</label>

        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Body</label>

        <textarea
          rows="8"
          placeholder="Write your blog..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <button type="submit">
          Publish Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;