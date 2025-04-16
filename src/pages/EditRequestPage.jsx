import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { ListingContext } from "../contexts/ListingContext";
import { RequestContext } from "../contexts/RequestContext";
import { RequestForm } from "../components/RequestForm";

export const EditRequestPage = () => {
  const { handleUpdateRequest, handleDeleteRequest, isLoadingReq, requests } =
    useContext(RequestContext);
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  // const { isLoadingListing, listings } = useContext(ListingContext);
  const { isLoadingListing } = useContext(ListingContext);
  const { requestId } = useParams();

  const nav = useNavigate();

  const [requestToEdit, setRequestToEdit] = useState(null);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      nav("/login");
    }
    let selectedRequest = requests.find((req) => req._id === requestId);
    console.log("HERE : ", selectedRequest);
    setRequestToEdit(selectedRequest);
  }, [isLoading, isLoggedIn, nav, requestId, requests]);

  const handleSubmit = (requestData) => {
    if (!user || !user.id) {
      console.error("Error: User is not logged in or user is undefined.");
      return;
    }
    console.log("Updated Request submitted : ", requestData);
    handleUpdateRequest(requestId, requestData);
  };

  const handleDelete = () => {
    handleDeleteRequest(requestId);
  }

  if (isLoading) return <p>Authentification is loading...</p>;
  if (isLoadingListing) return <p>Listing detail is loading...</p>;
  if (isLoadingReq || !requestToEdit) return <p>Request is loading...</p>;

  return (
    <main>
      <div className="create-listing-container">
        <h2>Update a Request</h2>
        <RequestForm
          isUpdateForm={true}
          initialData={requestToEdit}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
        <hr />
        {requestToEdit.listing && (<>
        <h4>{requestToEdit.listing.title}</h4>
        <p>
          <strong>Address:</strong> {requestToEdit.listing.address},{" "}
          {requestToEdit.listing.city}, {requestToEdit.listing.country}
        </p>
        <p>
          <strong>Host:</strong> {requestToEdit.host?.username || "Unknown"}
        </p>
        <Link to={`/listing/${requestToEdit.listing._id}`}>
          <button>Back to the listing details</button>
        </Link> </>)}
      </div>
    </main>
  );
};
