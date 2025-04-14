import api from "./api"; 

// Create a listing
export async function createListing(listingData) {
  return api.post("/listing/create", listingData); 
}

// Get a listing by ID
export async function getListingById(listingId) {
  return api.get(`/listing/${listingId}`); 
}

// Update a listing
export async function updateListing(listingId, listingData) {
  return api.patch(`/listing/update/${listingId}`, listingData); 
}

// Delete a listing
export async function deleteListing(listingId) {
  return api.delete(`/listing/delete/${listingId}`); 
}

// Get all listings
export async function getAllListings() {
  return api.get("/listing"); 
}

// Get all listings by user 
export async function getAllListingsByUser(userId) {
  return api.get(`/listing/host/${userId}`); 
}

// Get all listings by host
export async function getListingsByHost(userId) {
  return api.get(`/listing/host/${userId}`);
}