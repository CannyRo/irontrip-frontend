import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getListingById } from "../services/listing.service";

export const ListingDetailPage = () => {
  const { listingId } = useParams(); // Get the listing ID from the URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListingById(listingId); // Fetch the listing by ID
        setListing(response.data.data); // Set the listing data
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false); // stops loading if an error occurs
      }
    };

    fetchListing();
  }, [listingId]);

  if (loading) {
    return <p>Loading listing...</p>;
  }

  if (!listing) {
    return <p>Listing not found.</p>;
  }

  return (
    <div className="listing-detail-container">
      <h2>{listing.title}</h2>
      <p>
        <strong>Address:</strong> {listing.address}, {listing.city},{" "}
        {listing.country}
      </p>
      <p>
        <strong>Description:</strong> {listing.description}
      </p>
      <p>
        <strong>Host:</strong> {listing.host?.username || "Unknown"}
      </p>
      <p>
        <strong>Location:</strong> Latitude: {listing.location?.lat || "N/A"},
        Longitude: {listing.location?.lng || "N/A"}
      </p>
      <div className="image-container">
        <img
          src={listing.image}
          alt={listing.title}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="availability-section">
        <h4>Availability:</h4>
        {listing.availability.length > 0 ? (
          listing.availability.map((range, index) => (
            <div key={index}>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(range.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(range.endDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No availability provided.</p>
        )}
      </div>
      <Link to={`/listings/${listing._id}/request`}>
        <button>Book dates</button>
      </Link>
    </div>
  );
};
