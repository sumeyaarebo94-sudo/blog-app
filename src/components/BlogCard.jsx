import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { createdPostsAtom } from "../atoms/bookmarkAtoms";

function BlogCard({ post, isCreated }) {
  const [createdPosts, setCreatedPosts] = useAtom(createdPostsAtom);

  function deletePost() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    const updatedPosts = createdPosts.filter(
      (p) => p.id !== post.id
    );

    setCreatedPosts(updatedPosts);

    localStorage.setItem(
      "createdPosts",
      JSON.stringify(updatedPosts)
    );
  }

  return (
    <div className="blog-card">
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

      {isCreated && (
        <button onClick={deletePost}>
          Delete Post
        </button>
      )}
    </div>
  );
}

export default BlogCard;