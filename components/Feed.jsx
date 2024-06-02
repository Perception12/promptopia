"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-10 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [fetched, setFetched] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
      setFetched(true);
    };

    if (!fetched) {
      fetchPrompts();
    } else {
      let lowerTextSearch = searchText.toLowerCase()
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.prompt.toLowerCase().includes(lowerTextSearch) ||
            post.creator.email
              .toLowerCase()
              .includes(lowerTextSearch) ||
            post.creator.username.includes(lowerTextSearch) ||
            post.tag.toLowerCase().includes(lowerTextSearch)
        )
      );
    }
  }, [searchText]);

  return (
    <section className="feed">
      <form
        className="w-full flex-center relative"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={(tag) => {setSearchText(tag)}} />
    </section>
  );
};

export default Feed;
