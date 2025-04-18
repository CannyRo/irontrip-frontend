import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { ListingContext } from "../contexts/ListingContext";
import { RequestContext } from "../contexts/RequestContext";
import { RequestForm } from "../components/RequestForm";
import { Loader } from "../components/Loader";

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
    setListing(selectedListing);
  }, [isLoading, isLoggedIn, nav, listingId, listings]);

  const handleSubmit = (requestData) => {
    if (!user || !user.id) {
      console.error("Error: User is not logged in or user is undefined.");
      return;
    }
    const formattedData = {
      ...requestData,
      traveler: user.id,
      host: listing.host,
      listing: listing._id,
    };
    handleCreateRequest(formattedData);
  };

  if (isLoading)
    return (
      <main>
        <Loader/>
        <p>Authentification is loading...</p>
      </main>
    );
  if (isLoadingListing || !listing)
    return (
      <main>
        <Loader/>
        <p>Listing detail is loading...</p>
      </main>
    );

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
