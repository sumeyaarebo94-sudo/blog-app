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
    };

    setCreatedPosts((prev) => {
      const updatedPosts = [newPost, ...prev];

      localStorage.setItem(
        "createdPosts",
        JSON.stringify(updatedPosts)
      );

      return updatedPosts;
    });

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    alert("Post created successfully!");

    navigate("/");
  }

  return (
    <div>
      <h1>Create New Post</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Body</label>
          <br />
          <textarea
            rows="6"
            placeholder="Write your blog..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;