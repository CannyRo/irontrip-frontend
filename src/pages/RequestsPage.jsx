import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { RequestContext } from "../contexts/RequestContext";
import { getRequestsByUser } from "../services/request.service";

export const RequestsPage = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const { isLoadingReq } = useContext(RequestContext);

  const [myRequests, setMyRequests] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      nav("/login");
    }
    if(user && user.id){
      async function fetchRequests() {
      try {
        const res = await getRequestsByUser(user.id);
        setMyRequests(res.data.data);
      } catch (err) {
        console.error("Error :", err);
      }
    }
    fetchRequests();
    }
    console.log("myData ",myRequests);
  }, [user?.id, user, isLoading, isLoggedIn, nav]);

  const getFormattedDate = (isoDate) => new Date(isoDate).toISOString().split("T")[0];

  if (isLoading) return <p>Authentification is loading...</p>;
  if (isLoadingReq || !myRequests){
    console.log("check isLoadingReq = ", isLoadingReq);
    console.log("check myRequests = ", myRequests);
    return <p>Request is loading...</p>;
  } 
  if (myRequests.length === 0) {
    return (
      <main>
        <div className="listings-page-container">
          <h2>My Request</h2>
          <p>No requests found.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="listings-page-container">
        <h2>My Request</h2>
        <div className="listings-grid">
          {(myRequests && myRequests.length>0) && myRequests.map((req) => (
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
              <h3>{req?.listing?.title}</h3>
              <p><strong>Host: </strong>{req?.host?.username}</p>
              <p><strong>Traveler: </strong>{req?.traveler?.username}</p>
              <div className="listing-actions">
                <Link to={`/listing/${req?.listing?._id}`}>
                  <button>Back to the listing details</button>
                </Link>
                <Link to={`/edit-request/${req?._id}`}>
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
