import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { RequestContext } from "../contexts/RequestContext";
import { getRequestsByUser } from "../services/request.service";
import { Loader } from "../components/Loader";

export const RequestsPage = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const { isLoadingReq } = useContext(RequestContext);

  const [myRequests, setMyRequests] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      nav("/login");
    }
    if (user && user.id) {
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
    console.log("myData ", myRequests);
  }, [user?.id, user, isLoading, isLoggedIn, nav]);

  const getFormattedDate = (isoDate) =>
    new Date(isoDate).toISOString().split("T")[0];

  if (isLoading) return <p>Authentification is loading...</p>;
  if (isLoadingReq || !myRequests) {
    console.log("check isLoadingReq = ", isLoadingReq);
    console.log("check myRequests = ", myRequests);
    return (
      <main>
        <Loader />
        <p>Request is loading...</p>
      </main>
    );
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
      <div className="home-container">
        <h1>My Request</h1>
        <div className="listing-list-container">
          {myRequests &&
            myRequests.length > 0 &&
            myRequests.map((req) => (
              <div key={req._id} className="listing-card gap-1">
                <div className="listing-card-date">
                  <div className="form-control">
                    <label>Start:</label>
                    <input
                      type="date"
                      value={getFormattedDate(req.arrivalDate)}
                      readOnly
                    />
                  </div>
                  <div className="form-control">
                    <label>End:</label>
                    <input
                      type="date"
                      value={getFormattedDate(req.departureDate)}
                      readOnly
                    />
                  </div>
                </div>

                <h2 className="listing-card-title">{req?.listing?.title}</h2>
                <div>
                  <p className="username">
                    <span className="username-label">Host: </span>
                    {req?.host?.username.toLowerCase()}
                  </p>
                  <p className="username">
                    <span className="username-label">Traveler: </span>
                    {req?.traveler?.username.toLowerCase()}
                  </p>
                </div>

                <div className="listing-card-actions">
                  <Link to={`/listing/${req?.listing?._id}`}>
                    <button>Back to the listing details</button>
                  </Link>
                  <Link to={`/edit-request/${req?._id}`}>
                    <button className="btn-shrink">Edit Request</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};
