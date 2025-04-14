import { createContext, useState } from "react";
import {
  getListingById as fetchListingById,
  updateListing,
  createListing, // Import the createListing service function
} from "../services/listing.service";

const ListingContext = createContext();

const ListingContextWrapper = ({ children }) => {
  const [listings, setListings] = useState([]);

  // Fetch a single listing by ID
  const getListingById = async (id) => {
    try {
      const response = await fetchListingById(id); // Call the service function
      return response.data; // Return the listing data
    } catch (error) {
      console.error("Error fetching listing by ID:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  };

  // Update an existing listing
  const handleUpdateListing = async (id, updatedData) => {
    try {
      await updateListing(id, updatedData);
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  // Create a new listing
  const handleCreateListing = async (listingData) => {
    try {
      const response = await createListing(listingData); // Call the service function
      setListings((prevListings) => [...prevListings, response.data]); // Update the state
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  return (
    <ListingContext.Provider
      value={{
        getListingById,
        handleUpdateListing,
        handleCreateListing, // Add handleCreateListing to the context
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export { ListingContext, ListingContextWrapper };
