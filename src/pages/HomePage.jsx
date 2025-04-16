import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { ListingContext } from "../contexts/ListingContext";
import { SearchBar } from "../components/SearchBar";


export const HomePage = () => {
  const { isLoadingListing, listings } = useContext(ListingContext);
  const [ filteredListings, setFilteredListings ] = useState(null);
  const [ searchTerm, setSearchTerm] = useState("");
  useEffect(()=>{
    // handleGetAllListings();
    console.log("### listings ###");
    console.log(listings);
    console.log("### END listings ###");
    const filteredData = listings.filter(listing => {
      if(
        ( listing.title && listing.title.toLowerCase().includes( searchTerm.toLowerCase() ) ) ||
        ( listing.address && listing.address.toLowerCase().includes( searchTerm.toLowerCase() )) ||
        ( listing.city && listing.city.toLowerCase().includes( searchTerm.toLowerCase() )) ||
        ( listing.country && listing.country.toLowerCase().includes( searchTerm.toLowerCase() )) ||
        ( listing.description && listing.description.toLowerCase().includes( searchTerm.toLowerCase() ))
      ) {
        return listing;
      }

    });
    setFilteredListings(filteredData);
  },[listings, searchTerm]);

  if (isLoadingListing) {
    return <p>Loading listings...</p>;
  }

  return (
    <main>
      <h2>
        HomePage
      </h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="listings-page-container">
      <div className="listings-grid">
        {filteredListings && filteredListings.map((listing) => (
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
