import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { getListingsByHost } from "../services/listing.service";

export const ListingsPage = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (user && user.id) { // Use user.id instead of user._id
          const response = await getListingsByHost(user.id); // Fetch listings for the logged-in user
          setListings(response.data.data); // Set the listings
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchListings();
  }, [user]);

  if (loading) {
    return <p>Loading listings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (listings.length === 0) {
    return <p>No listings found for this user.</p>;
  }

  return (
    <div className="listings-page-container">
      <h2>Your Listings</h2>
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
