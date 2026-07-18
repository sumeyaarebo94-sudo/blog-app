import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the selected blog post
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

    // Fetch comments for the selected blog post
    fetch(`https://dummyjson.com/comments/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Blog Details</h1>

      <h2>{post.title}</h2>

      <p>{post.body}</p>

      <p>
        <strong>Tags:</strong> {post.tags.join(", ")}
      </p>

      <h3>Comments</h3>

      {comments.map((comment) => (
        <div key={comment.id}>
          <h4>{comment.user.username}</h4>
          <p>{comment.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default BlogDetails;