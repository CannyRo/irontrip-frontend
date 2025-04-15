import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ListingContext } from "../contexts/ListingContext";
import { ListingForm } from "../components/ListingForm";

export const EditListingPage = () => {
  const { listingId } = useParams(); // Use listingId instead of id
  const navigate = useNavigate();
  const { getListingById, handleUpdateListing } = useContext(ListingContext);

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (!listingId) {
      console.error("Listing ID is undefined");
      return;
    }

    const fetchListing = async () => {
      try {
        const listing = await getListingById(listingId); // Fetch the listing by ID
        console.log("Fetched listing:", listing); // Debug the fetched listing
        setInitialValues(listing); // Set the listing data
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [listingId, getListingById]);

  const handleSubmit = async (updatedData) => {
    try {
      await handleUpdateListing(listingId, updatedData); // Update the listing
      navigate("/listings"); // Redirect to the listings page
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  if (!listingId) return <p>Invalid listing ID.</p>;
  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="edit-listing-container">
      <h2>Edit Listing</h2>
      <ListingForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};
