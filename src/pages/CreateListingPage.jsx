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

    const payload = {
      ...listingData,
      host: user.id, // Add the host ID to the payload
    };


    console.log("Payload being sent to create listing:", payload);

    try {
      await handleCreateListing(payload); // Call handleCreateListing
      navigate("/listings"); // Redirect to the "My Listings" page after creation
    } catch (error) {
      console.error("Error creating listing:", error);
    }  
  };

  if (isLoading) return <p>Loading...</p>; // Show a loading message while authentication is in progress

  return (
    <div className="create-listing-container">
      <h2>Create a Listing</h2>
      <ListingForm onSubmit={handleSubmit} />
    </div>
  );
};
