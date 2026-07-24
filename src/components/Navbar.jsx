import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>📝 Personal Blog</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/bookmarks">Bookmarks</Link>
      </div>

      <Link to="/create">
        <button className="navbar-create-btn">
          ➕ Create New Post
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;