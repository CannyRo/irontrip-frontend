import { Link } from "react-router";

export const ListingsList = ({ listings, showEditButton = false }) => {
  if (!listings || listings.length === 0) {
    return <p>No listings available.</p>;
  }

  return (
    <div className="listings-grid">
      {listings.map((listing) => (
        <div key={listing._id} className="listing-card">
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
          <div className="listing-actions">
            <Link to={`/listing/${listing._id}`}>
              <button>View Details</button>
            </Link>
            {showEditButton && (
              <Link to={`/edit-listing/${listing._id}`}>
                <button>Edit Listing</button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};