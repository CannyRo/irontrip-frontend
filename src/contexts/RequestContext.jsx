import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import {
  createRequest,
  getRequestsByHost,
  getRequestsByTraveler,
  updateRequest,
  deleteRequest,
} from "../services/request.service";

const RequestContext = createContext();

const RequestContextWrapper = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  // Create a new Request
  const handleCreateRequest = async (requestData) => {
    try {
      const res = await createRequest(requestData);
      setRequests((prevRequest) => [res.data.data, ...prevRequest]);
      nav('/requests');
    } catch (error) {
      console.log(error);
      setRequests([]);
      setIsLoading(false);
    }
  };

  // Get all the requests as host
  const fetchRequestsAsHost = async (hostId) => {
    setIsLoading(true);
    try {
      const res = await getRequestsByHost(hostId);
      setRequests(res.data.data);
    } catch (error) {
      console.log(error);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get all the requests as host traveler
  const fetchRequestsAsTraveler = async (travelerId) => {
    setIsLoading(true);
    try {
      const res = await getRequestsByTraveler(travelerId);
      setRequests(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update a request
  const handleUpdateRequest = async (requestId, updateData) => {
    try {
      const res = await updateRequest(requestId, updateData);
      const updated = res.data.data;
      setRequests((prevRequest) =>
        prevRequest.map((requestValue) =>
          requestValue._id === updated._id ? updated : requestValue
        )
      );
      nav('/requests');
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a request
  const handleDeleteRequest = async (requestId) => {
    try {
      await deleteRequest(requestId);
      setRequests((prevRequest) =>
        prevRequest.filter((requestValue) => requestValue._id !== requestId)
      );
      nav('/requests');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        setRequests,
        isLoading,
        handleCreateRequest,
        fetchRequestsAsHost,
        fetchRequestsAsTraveler,
        handleUpdateRequest,
        handleDeleteRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export { RequestContext, RequestContextWrapper };
