import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { bookmarksAtom } from "../atoms/bookmarkAtoms";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] =
    useAtom(bookmarksAtom);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [newComment, setNewComment] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to fetch post"
          );
        }

        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    fetch(
      `https://dummyjson.com/comments/post/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        const savedComments =
          JSON.parse(
            localStorage.getItem(
              `comments-${id}`
            )
          ) || [];

        setComments([
          ...data.comments,
          ...savedComments,
        ]);
      });
  }, [id]);

  function addBookmark() {
    if (
      bookmarks.some(
        (p) => p.id === post.id
      )
    ) {
      alert("Already bookmarked!");
      return;
    }

    const updatedBookmarks = [
      ...bookmarks,
      post,
    ];

    setBookmarks(updatedBookmarks);

    localStorage.setItem(
      "bookmarks",
      JSON.stringify(updatedBookmarks)
    );

    alert("Bookmarked!");
  }

  function saveComments(updated) {
    setComments(updated);

    const onlyUserComments =
      updated.filter(
        (c) => c.isUserComment
      );

    localStorage.setItem(
      `comments-${id}`,
      JSON.stringify(
        onlyUserComments
      )
    );
  }

  function addComment() {
    if (
      name.trim() === "" ||
      newComment.trim() === ""
    ) {
      alert(
        "Please fill in all fields."
      );
      return;
    }

    if (editingId !== null) {
      const updated =
        comments.map((comment) =>
          comment.id === editingId
            ? {
                ...comment,
                body: newComment,
                user: {
                  username: name,
                },
              }
            : comment
        );

      saveComments(updated);

      setEditingId(null);
    } else {
      const comment = {
        id: Date.now(),
        body: newComment,
        user: {
          username: name,
        },
        isUserComment: true,
      };

      saveComments([
        ...comments,
        comment,
      ]);
    }

    setName("");
    setNewComment("");
  }

  function editComment(comment) {
    setEditingId(comment.id);
    setName(
      comment.user.username
    );
    setNewComment(comment.body);
  }

  function deleteComment(id) {
    if (
      !window.confirm(
        "Delete this comment?"
      )
    )
      return;

    const updated =
      comments.filter(
        (comment) =>
          comment.id !== id
      );

    saveComments(updated);
  }

  if (loading)
    return <h2>Loading...</h2>;

  if (error)
    return <h2>{error}</h2>;
    return (
    <div className="blog-details">

      <h1>Blog Details</h1>

      <div className="details-card">

        <h2>{post.title}</h2>

        <p>{post.body}</p>

        <p>
          ❤️ <strong>Likes:</strong>{" "}
          {post.reactions?.likes ??
            post.reactions ??
            0}
        </p>

        <p>
          <strong>Tags:</strong>{" "}
          {post.tags?.length > 0
            ? post.tags.join(", ")
            : "No Tags"}
        </p>

      </div>

      <div className="comments-section">

        <h2>
          Comments ({comments.length})
        </h2>

        {comments.map((comment) => (
          <div
            className="comment-card"
            key={comment.id}
          >
            <h4>
              {comment.user.username}
            </h4>

            <p>{comment.body}</p>

            {comment.isUserComment && (
              <div className="comment-actions">

                <button
                  onClick={() =>
                    editComment(comment)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteComment(
                      comment.id
                    )
                  }
                >
                  Delete
                </button>

              </div>
            )}

          </div>
        ))}

      </div>

      <div className="add-comment">

        <h2>
          {editingId !== null
            ? "Edit Comment"
            : "Add Comment"}
        </h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          rows="5"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) =>
            setNewComment(
              e.target.value
            )
          }
        />

        <button onClick={addComment}>
          {editingId !== null
            ? "Save Changes"
            : "Add Comment"}
        </button>

      </div>

      <div className="details-buttons">

        <button
          onClick={addBookmark}
        >
          Bookmark
        </button>

        <button
          onClick={() =>
            navigate("/")
          }
        >
          ← Back
        </button>

      </div>

    </div>
  );
}

export default BlogDetails;