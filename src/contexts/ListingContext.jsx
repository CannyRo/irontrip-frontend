import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getAllListings,
  createListing,
  updateListing,
  deleteListing,
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

  
// Create a new listing
  const handleCreateListing = async (listingData) => {
    try {
      const response = await createListing(listingData);
      setListings((prevListings) => [...prevListings, response.data]);
      nav('/listings')
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  // Update an existing listing
  const handleUpdateListing = async (listingId, listingData) => {
    try {
      const response = await updateListing(listingId, listingData);
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === listingId ? response.data : listing
        )
      );
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  // Delete a listing
  const handleDeleteListing = async (listingId) => {
    try {
      await deleteListing(listingId);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };
  
  return (
    <ListingContext.Provider
      value={{
        listings,
        isLoadingListing,
        handleGetAllListings,
        handleCreateListing,
        handleUpdateListing,
        handleDeleteListing,        
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export { ListingContext, ListingContextWrapper };
