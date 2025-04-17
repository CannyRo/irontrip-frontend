import { Link, useParams, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { getListingById, deleteListing } from "../services/listing.service";
import { Map } from "../components/Map";
import { AuthContext } from "../contexts/AuthContext";

export const ListingDetailPage = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListingById(listingId);
        setListing(response.data.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      await deleteListing(listingId);
      alert("Listing deleted successfully.");
      navigate("/listings");
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Failed to delete the listing. Please try again.");
    }
  };

  const handleUpdate = () => {
    navigate(`/edit-listing/${listingId}`);
  };

  if (loading) {
    return <p>Loading listing...</p>;
  }

  if (!listing) {
    return <p>Listing not found.</p>;
  }

  return (
    <main>
      <div className="detail-container">
        <div className="detail-info">
          <div>
            <h1 className="detail-info-title">{listing.title}</h1>
            <p className="detail-info-text">
              <span className="detail-info-bold">Address:</span>{" "}
              {listing.address}, {listing.city}, {listing.country}
            </p>
            <p className="detail-info-text">
              <span className="detail-info-bold">Description:</span>{" "}
              {listing.description}
            </p>
            <p className="username">
              <span className="username-label">Host:</span>{" "}
              {listing.host?.username.toLowerCase() || "Unknown"}
            </p>
            <div className="availability-section">
              <h4>Availability:</h4>
              {listing.availability.length > 0 ? (
                listing.availability.map((range, index) => (
                  <div key={index}>
                    <p className="availability-date-container">
                      <span className="availability-date-label">Start:</span>{" "}
                      {new Date(range.startDate).toLocaleDateString()}
                    </p>
                    <p className="availability-date-container">
                      <span className="availability-date-label">End:</span>{" "}
                      {new Date(range.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No availability provided.</p>
              )}
            </div>
          </div>
          <div className="actions">
            {listing?.host?._id == user?.id ? (
              <>
                <button className="btn-form" onClick={handleUpdate}>
                  Update Listing
                </button>
                <button className="btn-form danger" onClick={handleDelete}>
                  Delete Listing
                </button>
              </>
            ) : (
              <Link to={`/listings/${listing._id}/request`}>
                <button className="btn-form">Book Dates</button>
              </Link>
            )}
          </div>
        </div>
        <div className="image-and-map">
<div
          className="detail-image-container"
          style={{ backgroundImage: `url(${listing.image})` }}
        >
          {/* listing image as background of this container */}
        </div>

        <div className="location-section">
          {listing.location?.lat && listing.location?.lng && (
            <Map
              lat={listing.location.lat}
              lng={listing.location.lng}
              title={`${
                listing.title
              }, ${listing.city.toUpperCase()}, ${listing.country.toUpperCase()}`}
            />
          )}
        </div>
        </div>
        
      </div>
    </main>
  );
};
