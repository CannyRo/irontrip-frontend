// ListingsPage.jsx
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { ListingContext } from "../contexts/ListingContext";

export const ListingsPage = () => {
  const { getAllListings } = useContext(ListingContext); // Fetch all listings from context
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const data = await getAllListings();
      setListings(data);
    };

    fetchListings();
  }, [getAllListings]);

  if (listings.length === 0) {
    return <p>Loading listings...</p>;
  }

  return (
    <div className="listings-page-container">
      <h2>All Listings</h2>
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <div className="listing-actions">
              <Link to={`/listing/${listing._id}`}>
                <button>View Details</button>
              </Link>
              <Link to={`/edit-listing/${listing._id}`}>
                <button>Edit Listing</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
