import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center mb-6"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        className="w-1/2 p-2 border rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
