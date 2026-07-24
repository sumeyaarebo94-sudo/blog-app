import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { createdPostsAtom } from "../atoms/bookmarkAtoms";
import BlogCard from "../components/BlogCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [createdPosts] = useAtom(createdPostsAtom);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTag, setSelectedTag] = useState("All");
  const [showTop, setShowTop] = useState(false);

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

        const localCreatedPosts = createdPosts.map((post) => {
          const localComments =
            JSON.parse(
              localStorage.getItem(`comments-${post.id}`)
            ) || [];

          return {
            ...post,
            commentCount: localComments.length,
          };
        });

        setPosts([
          ...localCreatedPosts,
          ...postsWithComments,
        ]);

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [createdPosts]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  const allTags = [
    "All",
    ...new Set(posts.flatMap((post) => post.tags || [])),
  ];

  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((post) =>
          post.tags?.includes(selectedTag)
        );

  return (
    <div className="home">
      <div className="welcome-section">
        <p>
          Welcome! Discover interesting posts,
          share your ideas, and connect through
          comments.
        </p>
      </div>

      <h3>Filter by Tag</h3>

      <div className="tag-buttons">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="posts-grid">
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

      {showTop && (
        <button
          className="scroll-top"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default Home;