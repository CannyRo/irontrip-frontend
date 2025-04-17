import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
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

  const handleSubmit = async (listingData) => {
    if (!user || !user.id) {
      console.error("Error: User is not logged in or user is undefined.");
      return;
    }

    try {
      await handleCreateListing(listingData); // Call handleCreateListing
      navigate("/listings"); // Redirect to the "My Listings" page after creation
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  if (isLoading) return <p className="loading-message">Loading...</p>; // Show a loading message while authentication is in progress

  return (
    <main>
      <div className="glass-container">
        <h2>Create a new Listing</h2>
        <ListingForm
          onSubmit={handleSubmit}
          host={user.id}
          className="create-listing-form card-content"
        />
      </div>
    </main>
  );
};
