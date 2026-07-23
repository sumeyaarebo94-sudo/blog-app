import { Link } from "react-router-dom";
import { useState } from "react";
import { useAtom } from "jotai";
import {
  createdPostsAtom,
  bookmarksAtom,
} from "../atoms/bookmarkAtoms";

function BlogCard({ post, isCreated }) {
  const [createdPosts, setCreatedPosts] =
    useAtom(createdPostsAtom);

  const [bookmarks, setBookmarks] =
    useAtom(bookmarksAtom);

  const savedLikes =
    JSON.parse(localStorage.getItem("likes")) || {};

  const [likes, setLikes] = useState(
    savedLikes[post.id] ??
      (post.reactions?.likes ??
        post.reactions ??
        0)
  );

  const [liked, setLiked] = useState(
    savedLikes[`${post.id}-liked`] || false
  );

  function likePost() {
    const updatedLikes = {
      ...savedLikes,
    };

    if (liked) {
      updatedLikes[post.id] = likes - 1;
      updatedLikes[`${post.id}-liked`] = false;

      setLikes(likes - 1);
      setLiked(false);
    } else {
      updatedLikes[post.id] = likes + 1;
      updatedLikes[`${post.id}-liked`] = true;

      setLikes(likes + 1);
      setLiked(true);
    }

    localStorage.setItem(
      "likes",
      JSON.stringify(updatedLikes)
    );
  }

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

    const updatedBookmarks =
      bookmarks.filter(
        (p) => p.id !== post.id
      );

    setBookmarks(updatedBookmarks);

    localStorage.setItem(
      "bookmarks",
      JSON.stringify(updatedBookmarks)
    );
  }

  return (
    <div className="blog-card">
      <Link to={`/blog/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>

     <p>
         {post.body?.length > 120
         ? post.body.slice(0, 120) + "..."
         : post.body}
     </p>

    <Link
        to={`/blog/${post.id}`}
        className="read-more"
>
       Read More →
   </Link> 
  <p
        onClick={likePost}
        style={{
          cursor: "pointer",
          userSelect: "none",
          fontWeight: "bold",
        }}
      >
        {liked ? "❤️" : "🤍"} Likes: {likes}
      </p>

      <p>
        💬 <strong>Comments:</strong>{" "}
        {post.commentCount ?? 0}
      </p>

      <div className="tags">
         {post.tags &&
          post.tags.length > 0 ? (
          post.tags.map((tag) => (
        <span
          key={tag}
          className="tag"
      >
          #{tag}
        </span>
       ))
       ) : (
       <span className="tag">
         No Tags
       </span>
       )}
      </div>   

      {isCreated && (
        <button onClick={deletePost}>
          Delete Post
        </button>
      )}
    </div>
  );
}

export default BlogCard;