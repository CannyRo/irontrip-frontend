import api from "./api";

export const createRequest = (requestData) => {
  return api.post("/request/create", requestData);
};

export const getRequestsByHost = (hostId) => {
  return api.get(`/request/host/${hostId}`);
};

export const getRequestsByTraveler = (travelerId) => {
  return api.get(`/request/traveler/${travelerId}`);
};

export const getRequestById = (requestId) => {
  return api.get(`/request/${requestId}`);
};

export const updateRequest = (requestId, updateData) => {
  return api.patch(`/request/update/${requestId}`, updateData);
};

export const deleteRequest = (requestId) => {
  return api.delete(`/request/delete/${requestId}`);
};
