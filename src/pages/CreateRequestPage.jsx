import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { ListingContext } from "../contexts/ListingContext";
import { RequestContext } from "../contexts/RequestContext";
import { RequestForm } from "../components/RequestForm";

export const CreateRequestPage = () => {
  const { handleCreateRequest } = useContext(RequestContext);
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const { isLoadingListing, listings } = useContext(ListingContext);
  const { listingId } = useParams();

  const nav = useNavigate();

  const [listing, setListing] = useState(null);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      nav("/login");
    }
    let selectedListing = listings.find((listing) => listing._id === listingId);
    // console.log("HERE : ", selectedListing);
    setListing(selectedListing);
  }, [isLoading, isLoggedIn, nav, listingId, listings]);

  const handleSubmit = (requestData) => {
    if (!user || !user.id) {
      console.error("Error: User is not logged in or user is undefined.");
      return;
    }
    console.log("new Request submitted : ", requestData);
    const formattedData = {
      ...requestData,
      traveler: user.id,
      host: listing.host,
      listing: listing._id,
    };
    console.log("formattedData : ", formattedData);
    handleCreateRequest(formattedData);
  };

  if (isLoading) return <p>Authentification is loading...</p>;
  if (isLoadingListing || !listing) return <p>Listing detail is loading...</p>;

  return (
    <main>
      <div className="glass-container">
        <h2 className="resume-section-title">Create a new Request</h2>
        <RequestForm onSubmit={handleSubmit} />
        <hr />
        <div className="resume-section">
          <h3 className="resume-section-title">{listing.title}</h3>
          <p className="resume-section-text">
            <span>Address:</span> {listing.address}, {listing.city},{" "}
            {listing.country}
          </p>
          <p className="username">
            <span className="username-label">Host:</span>{" "}
            {listing.host?.username || "Unknown"}
          </p>
          <Link to={`/listing/${listing._id}`}>
            <button className="btn-form">Back to the listing details</button>
          </Link>
        </div>
      </div>
    </main>
  );
};
