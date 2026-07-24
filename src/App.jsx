import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreatePost from "./pages/CreatePost";
import Bookmarks from "./pages/Bookmarks";

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
            />
          }
        />

        <Route
          path="/create"
          element={<CreatePost />}
        />

        <Route
          path="/bookmarks"
          element={<Bookmarks />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;