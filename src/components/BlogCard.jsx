import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <div>
      <Link to={`/blog/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>

      <p>{post.body}</p>

      <p>
        ❤️ <strong>Likes:</strong>{" "}
        {post.reactions?.likes ?? post.reactions ?? 0}
      </p>

      <p>
        💬 <strong>Comments:</strong>{" "}
        {post.commentCount ?? 0}
      </p>

      <p>
        <strong>Tags:</strong>{" "}
        {post.tags && post.tags.length > 0
          ? post.tags.join(", ")
          : "No Tags"}
      </p>

      <hr />
    </div>
  );
}

export default BlogCard;