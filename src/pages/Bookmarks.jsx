import { useAtom } from "jotai";
import { bookmarksAtom } from "../atoms/bookmarkAtoms";
import BlogCard from "../components/BlogCard";

function Bookmarks() {
  const [bookmarks] = useAtom(bookmarksAtom);

  return (
    <div className="bookmarks">
      <h1>⭐ Bookmarked Posts</h1>

      {bookmarks.length === 0 ? (
        <div className="empty-message">
          <h3>No bookmarked posts yet.</h3>
          <p>
            Bookmark your favorite posts and they will
            appear here.
          </p>
        </div>
      ) : (
        bookmarks.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            isCreated={false}
          />
        ))
      )}
    </div>
  );
}

export default Bookmarks;