import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ListingContext } from "../contexts/ListingContext";
import { ListingForm } from "../components/ListingForm";


export const EditListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getListingById, handleUpdateListing } = useContext(ListingContext);

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      const listing = await getListingById(id);
      setInitialValues(listing);
    };

    fetchListing();
  }, [id, getListingById]);

  const handleSubmit = async (updatedData) => {
    await handleUpdateListing(id, updatedData);
    navigate("/listings");
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="edit-listing-container">
      <h2>Edit Listing</h2>
      <ListingForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};
