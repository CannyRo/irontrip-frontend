import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListingById, deleteListing } from "../services/listing.service";

export const ListingDetailPage = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="container">
      <div className="card">
        <h1>{listing.title}</h1>
        <p>
          <strong>Address:</strong> {listing.address}
        </p>
        <p>
          <strong>Description:</strong> {listing.description}
        </p>
        <p>
          <strong>Host:</strong> {listing.hostEmail}
        </p>
        <div className="card">
          <h3>Availability:</h3>
          <p>No availability provided.</p>
        </div>
        <div className="actions">
          <button className="primary" onClick={handleUpdate}>
            Update Listing
          </button>
          <button className="danger" onClick={handleDelete}>
            Delete Listing
          </button>
        </div>
      </div>
    </div>
  );
};
