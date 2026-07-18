import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>📝 Personal Blog</h2>

      <Link to="/">Home</Link> |{" "}
      <Link to="/create">Create Post</Link> |{" "}
      <Link to="/bookmarks">Bookmarks</Link>
    </nav>
  );
}

export default Navbar;