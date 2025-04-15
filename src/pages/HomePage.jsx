import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { ListingContext } from "../contexts/ListingContext";


export const HomePage = () => {
  const { isLoadingListing, listings } = useContext(ListingContext);

  useEffect(()=>{
    // handleGetAllListings();
    console.log("### listings ###");
    console.log(listings);
    console.log("### END listings ###");
  },[listings]);

  if (isLoadingListing) {
    return <p>Loading listings...</p>;
  }

  return (
    <main>
      <h2>
        HomePage
      </h2>
      <div className="listings-page-container">
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <div className="listing-actions">
              <Link to={`/listing/${listing._id}`}>
                <button>View Details</button>
              </Link>
              <Link to={`/listings/${listing._id}/request`}>
                <button>Book dates</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>
      </main>
  )
}
