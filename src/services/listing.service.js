import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL: baseURL || "http://localhost:5005" });

// Add Authorization header for all requests
api.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  if (storedToken) {
    config.headers.Authorization = `Bearer ${storedToken}`;
  }
  return config;
});

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

// Get all listings by user (host)
export async function getAllListingsByUser(userId) {
  return api.get(`/listing/host/${userId}`); 
}
