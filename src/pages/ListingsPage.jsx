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
    <main>
      <div className="home-container">
        <h1 className="listings-header">My Listings</h1>
        <div className="listing-list-container">
          {listings &&
            listings.map((listing) => (
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
