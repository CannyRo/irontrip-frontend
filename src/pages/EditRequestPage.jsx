import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { ListingContext } from "../contexts/ListingContext";
import { RequestContext } from "../contexts/RequestContext";
import { RequestForm } from "../components/RequestForm";
import { Loader } from "../components/Loader";

export const EditRequestPage = () => {
  const { handleUpdateRequest, handleDeleteRequest, isLoadingReq, requests } =
    useContext(RequestContext);
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const { isLoadingListing } = useContext(ListingContext);
  const { requestId } = useParams();

  const nav = useNavigate();

  const [requestToEdit, setRequestToEdit] = useState(null);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      nav("/login");
    }
    let selectedRequest = requests.find((req) => req._id === requestId);
    setRequestToEdit(selectedRequest);
  }, [isLoading, isLoggedIn, nav, requestId, requests]);

  const handleSubmit = (requestData) => {
    if (!user || !user.id) {
      console.error("Error: User is not logged in or user is undefined.");
      return;
    }
    handleUpdateRequest(requestId, requestData);
  };

  const handleDelete = () => {
    handleDeleteRequest(requestId);
  };

  if (isLoading)
    return (
      <main>
        <Loader/>
        <p>Authentification is loading...</p>
      </main>
    );
  if (isLoadingListing)
    return (
      <main>
        <Loader/>
        <p>Listing detail is loading...</p>
      </main>
    );
  if (isLoadingReq || !requestToEdit)
    return (
      <main>
        <Loader/>
        <p>Request is loading...</p>
      </main>
    );

  return (
    <main>
      <div className="glass-container">
        <h2>Update a Request</h2>
        <RequestForm
          isUpdateForm={true}
          initialData={requestToEdit}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
        <hr />

        {requestToEdit.listing && (
          <div className="resume-section">
            <h3 className="resume-section-title">
              {requestToEdit?.listing?.title}
            </h3>
            <p className="resume-section-text">
              <span>Address:</span> {requestToEdit?.listing?.address},{" "}
              {requestToEdit?.listing?.city}, {requestToEdit?.listing?.country}
            </p>
            <p className="username">
              <span className="username-label">Host:</span>{" "}
              {requestToEdit?.listing?.host?.username || "Unknown"}
            </p>
            <Link to={`/listing/${requestToEdit?.listing?._id}`}>
              <button className="btn-form">Back to the listing details</button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};
