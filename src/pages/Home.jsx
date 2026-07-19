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

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  const allPosts = [...createdPosts, ...posts];

  return (
    <div>
      <h1>Home Page</h1>

      <Link to="/create">
        <button>Create New Post</button>
      </Link>

      <br />
      <br />

      {allPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;