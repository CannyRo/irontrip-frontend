import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { ListingContext } from "../contexts/ListingContext";
import { SearchBar } from "../components/SearchBar";

export const HomePage = () => {
  const { isLoadingListing, listings } = useContext(ListingContext);
  const [filteredListings, setFilteredListings] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = listings.filter((listing) => {
      if (
        (listing.title &&
          listing.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (listing.address &&
          listing.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (listing.city &&
          listing.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (listing.country &&
          listing.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (listing.description &&
          listing.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        return listing;
      }
    });
    setFilteredListings(filteredData);
  }, [listings, searchTerm]);

  if (isLoadingListing) {
    return <p>Loading listings...</p>;
  }

  return (
    <main>
      <div className="home-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="listing-list-container">
          {filteredListings &&
            filteredListings.map((listing) => (
              <div key={listing._id} className="listing-card">
                <div className="listing-card-content">
                  <div
                    className="listing-card-image-container"
                    style={{ backgroundImage: `url(${listing.image})` }}
                  >
                    {/* listing image as background of this container */}
                  </div>
                  <div className="listing-card-text-container">
                    <h3 className="listing-card-title">{listing.title}</h3>
                    <p className="listing-card-description">{listing.description}</p>
                  </div>
                </div>
                <div className="listing-card-actions">
                  <Link to={`/listing/${listing._id}`}>
                    <button className="listing-card-btn">View Details</button>
                  </Link>
                  <Link to={`/listings/${listing._id}/request`}>
                    <button className="listing-card-btn">Book Dates</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};
