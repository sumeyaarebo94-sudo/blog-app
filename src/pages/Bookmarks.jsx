import { useAtom } from "jotai";
import { bookmarksAtom } from "../atoms/bookmarkAtoms";
import BlogCard from "../components/BlogCard";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

  function removeBookmark(id) {
    const updatedBookmarks = bookmarks.filter(
      (post) => post.id !== id
    );

    setBookmarks(updatedBookmarks);

    localStorage.setItem(
      "bookmarks",
      JSON.stringify(updatedBookmarks)
    );
  }

  return (
    <div>
      <h1>Bookmarked Posts</h1>

      {bookmarks.length === 0 ? (
        <p>No bookmarked posts yet.</p>
      ) : (
        bookmarks.map((post) => (
          <div key={post.id}>
            <BlogCard post={post} />

            <button onClick={() => removeBookmark(post.id)}>
              Remove Bookmark
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Bookmarks;