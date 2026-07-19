import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import {
  bookmarksAtom,
  createdPostsAtom,
} from "../atoms/bookmarkAtoms";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
  const [createdPosts] = useAtom(createdPostsAtom);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localPost = createdPosts.find(
      (p) => p.id.toString() === id
    );

    if (localPost) {
      setPost(localPost);
      setComments([]);
      setLoading(false);
      return;
    }

    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    fetch(`https://dummyjson.com/comments/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, [id, createdPosts]);

  function addBookmark() {
    const updatedBookmarks = [...bookmarks, post];

    setBookmarks(updatedBookmarks);

    localStorage.setItem(
      "bookmarks",
      JSON.stringify(updatedBookmarks)
    );
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Blog Details</h1>

      <h2>{post.title}</h2>

      <p>{post.body}</p>

      <p>
        <strong>Tags:</strong>{" "}
        {post.tags.length > 0
          ? post.tags.join(", ")
          : "No Tags"}
      </p>

      {comments.length > 0 && (
        <>
          <h3>Comments</h3>

          {comments.map((comment) => (
            <div key={comment.id}>
              <h4>{comment.user.username}</h4>
              <p>{comment.body}</p>
              <hr />
            </div>
          ))}
        </>
      )}

      <button onClick={addBookmark}>
        Bookmark
      </button>

      <button onClick={() => navigate("/")}>
        ← Back
      </button>
    </div>
  );
}

export default BlogDetails;