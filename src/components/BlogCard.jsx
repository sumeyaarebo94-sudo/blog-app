import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <div>
      <Link to={`/blog/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>

      <p>{post.tags.join(", ")}</p>
    </div>
  );
}

export default BlogCard;