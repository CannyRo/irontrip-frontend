import React from "react";

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  function handleSearch(e) {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  }
  function handleCLear(){
    setSearchTerm("");
  }
  return (
    <div>
      <input
        type="text"
        className="form-control search-bar"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Filter..."
      />
      <button onClick={handleCLear}>Clear</button>
    </div>
  );
};
