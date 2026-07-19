import { atom } from "jotai";

const savedBookmarks =
  JSON.parse(localStorage.getItem("bookmarks")) || [];

const savedCreatedPosts =
  JSON.parse(localStorage.getItem("createdPosts")) || [];

export const bookmarksAtom = atom(savedBookmarks);

export const createdPostsAtom = atom(savedCreatedPosts);