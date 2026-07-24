import { Link } from "react-router-dom";

function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <h2>📝 Personal Blog</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
        <Link to="/bookmarks">Bookmarks</Link>
      </div>

      <input
        type="text"
        placeholder="🔍 Search posts..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  );
}

export default Navbar;