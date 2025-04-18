import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ListingContext } from "../contexts/ListingContext";
import { ListingForm } from "../components/ListingForm";
import { Loader } from "../components/Loader";

export const EditListingPage = () => {
  const { listingId } = useParams(); // Use listingId instead of id
  const navigate = useNavigate();
  const { getListingById, handleUpdateListing } = useContext(ListingContext);

  const [initialValues, setInitialValues] = useState(null);
  const [listingToEdit, setListingToEdit] = useState(null);

  useEffect(() => {
    if (!listingId) {
      console.error("Listing ID is undefined");
      return;
    }

    const fetchListing = async () => {
      try {
        const listing = await getListingById(listingId); // Fetch the listing by ID
        console.log("Fetched listing:", listing); // Debugging
        setInitialValues(listing); // Set the listing data
        setListingToEdit(listing.data); // Set the listing data
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

  if (!listingId)
    return (
      <main>
        <p>Invalid listing ID.</p>
        <Link to="/">Back</Link>
      </main>
    );
  if (!initialValues || !listingToEdit)
    return (
      <main>
        <Loader />
        <p>Listing detail is loading...</p>
      </main>
    );

  return (
    <main>
      <div className="edit-listing-container">
        <h2>Edit Listing</h2>
        <ListingForm
          initialValues={listingToEdit}
          onSubmit={handleSubmit}
          isUpdateForm={true}
        />
      </div>
    </main>
  );
};
