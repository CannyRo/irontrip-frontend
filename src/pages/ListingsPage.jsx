import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { getListingsByHost } from "../services/listing.service";

export const ListingsPage = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (user && user.id) {
          const response = await getListingsByHost(user.id);
          setListings(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
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
      <h1 className="listings-header">Your Listings</h1>
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <div className="listing-image">
                          </div>
            <div className="listing-content">
              <h3>{listing.title}</h3>
              <p>{listing.description}</p>
              <div className="listing-actions">
                <Link to={`/listing/${listing._id}`}>
                  <button className="primary">View Details</button>
                </Link>
                <Link to={`/edit-listing/${listing._id}`}>
                  <button className="secondary">Edit Listing</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
