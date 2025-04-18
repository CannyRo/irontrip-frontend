import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  getAllListings,
  getListingById as fetchListingById,
  updateListing,
  createListing, // Import the createListing service function
} from "../services/listing.service";

const ListingContext = createContext();

const ListingContextWrapper = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [isLoadingListing, setIsLoadingListing] = useState(true);
  const nav = useNavigate();
  
  // Fetch all listings
  const handleGetAllListings = async () => {
    setIsLoadingListing(true);
    try {
      const response = await getAllListings();
      setListings(response.data.data);
    } catch(error){
      console.error("Error fetching listings:", error);
      setListings([]);
    } finally {
      setIsLoadingListing(false);
    }
  };
  
  useEffect(()=>{
    handleGetAllListings();
  },[]);
  
  // Fetch a single listing by ID
  const getListingById = async (id) => {
    setIsLoadingListing(true);
    try {
      const response = await fetchListingById(id); // Call the service function
      return response.data; // Return the listing data
    } catch (error) {
      console.error("Error fetching listing by ID:", error);
      throw error; // Re-throw the error to handle it in the component
    } finally {
      setIsLoadingListing(false);
    }
  };

  // Update an existing listing
  const handleUpdateListing = async (id, updatedData) => {
    try {
      const response = await updateListing(id, updatedData);
      const updated = response.data.data;
      setListings((prevListing) => prevListing.map((listingValue)=> listingValue._id === updated._id ? updated : listingValue));
      nav('/listings');
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
        listings,
        isLoadingListing,
        handleGetAllListings,
        handleUpdateListing,
        handleCreateListing, // Add handleCreateListing to the context
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export { ListingContext, ListingContextWrapper };
