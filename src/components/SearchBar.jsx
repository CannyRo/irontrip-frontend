import './SearchBar.css';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  function handleSearch(e) {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  }
  function handleCLear(){
    setSearchTerm("");
  }
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="form-control search-bar"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search / Filter..."
      />
      <button onClick={handleCLear}>Clear</button>
    </div>
  );
};
