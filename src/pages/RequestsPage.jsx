import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { RequestContext } from "../contexts/RequestContext";

export const RequestsPage = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const { isLoadingReq, requests } = useContext(RequestContext);

  const [myRequests, setMyRequests] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      nav("/login");
    }
    // console.log("requests from request page : ",requests);
    // console.log("user === ",user);
    // console.log(requests.map(req => req.host._id));
    // console.log(requests.map(req => req.traveler._id));
    let selectedRequests = requests.filter(
      (req) => req.host._id == user.id || req.traveler._id == user.id
    );
    console.log("selectedRequests _____ ",selectedRequests);
    setMyRequests(selectedRequests);
  }, [isLoading, isLoggedIn, nav, requests, user]);

  const getFormattedDate = (isoDate) => new Date(isoDate).toISOString().split("T")[0];

  if (isLoading) return <p>Authentification is loading...</p>;
  if (isLoadingReq || !myRequests){
    console.log("check isLoadingReq = ", isLoadingReq);
    console.log("check myRequests = ", myRequests);
    return <p>Request is loading...</p>;
  } 

  return (
    <main>
      <div className="listings-page-container">
        <h2>My Request</h2>
        <div className="listings-grid">
          {myRequests.map((req) => (
            <div key={req._id} className="listing-card">
              <label>
                Start Date:
                <input
                  type="date"
                  value={getFormattedDate(req.arrivalDate)}
                  readOnly
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  value={getFormattedDate(req.departureDate)}
                  readOnly
                />
              </label>
              <h3>{req.listing.title}</h3>
              <p><strong>Host: </strong>{req.host.username}</p>
              <p><strong>Traveler: </strong>{req.traveler.username}</p>
              <div className="listing-actions">
                <Link to={`/listing/${req.listing._id}`}>
                  <button>Back to the listing details</button>
                </Link>
                <Link to={`/edit-request/${req._id}`}>
                  <button>Edit Request</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
