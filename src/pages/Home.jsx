import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { createdPostsAtom } from "../atoms/bookmarkAtoms";
import BlogCard from "../components/BlogCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [createdPosts] = useAtom(createdPostsAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then(async (data) => {
        const postsWithComments = await Promise.all(
          data.posts.map(async (post) => {
            const res = await fetch(
              `https://dummyjson.com/comments/post/${post.id}`
            );
            const comments = await res.json();

            const localComments =
              JSON.parse(
                localStorage.getItem(`comments-${post.id}`)
              ) || [];

            return {
              ...post,
              commentCount:
                comments.comments.length +
                localComments.length,
            };
          })
        );

        const localCreatedPosts =
          createdPosts.map((post) => {
            const localComments =
              JSON.parse(
                localStorage.getItem(`comments-${post.id}`)
              ) || [];

            return {
              ...post,
              commentCount: localComments.length,
            };
          });

        const allPosts = [
          ...localCreatedPosts,
          ...postsWithComments,
        ];

        setPosts(allPosts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [createdPosts]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const allTags = [
    "All",
    ...new Set(
      posts.flatMap((post) => post.tags || [])
    ),
  ];

  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((post) =>
          post.tags?.includes(selectedTag)
        );

  return (
    <div className="home">
      <h1>Personal Blog</h1>

      <p className="welcome-text">
        Welcome! Discover interesting posts,
        share your ideas, and connect through
        comments.
      </p>

      <Link to="/create">
        <button>➕ Create New Post</button>
      </Link>

      <br />
      <br />

      <h3>Filter by Tag</h3>

      <div className="tag-buttons">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              setSelectedTag(tag)
            }
          >
            {tag}
          </button>
        ))}
      </div>

      <br />

      <div className="blog-grid">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            isCreated={createdPosts.some(
              (p) => p.id === post.id
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;