import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListingContext } from "../contexts/ListingContext";
import { AuthContext } from "../contexts/AuthContext";
import { ListingForm } from "../components/ListingForm";

export const CreateListingPage = () => {
  const { handleCreateListing } = useContext(ListingContext);
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [isLoading, isLoggedIn, navigate]);

  const handleSubmit = (listingData) => {
    if (!user || !user._id) {
      console.error("Error: User is not logged in or user is undefined.");
      return;
    }

    handleCreateListing({
      ...listingData,
      owner: user._id,
    });
  };

  if (isLoading) return <p>Loading...</p>; // Show a loading message while authentication is in progress

  return (
    <div className="create-listing-container">
      <h2>Create a Listing</h2>
      <ListingForm onSubmit={handleSubmit} />
    </div>
  );
};