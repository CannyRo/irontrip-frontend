import { useState } from "react";

export const ListingForm = ({
  initialValues = {
    title: "",
    address: "",
    city: "",
    country: "",
    description: "",
    availability: [{ startDate: "", endDate: "" }],
    image: "", // Default value for the image URL
  },
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [address, setAddress] = useState(initialValues.address);
  const [city, setCity] = useState(initialValues.city);
  const [country, setCountry] = useState(initialValues.country);
  const [description, setDescription] = useState(initialValues.description);
  const [availability, setAvailability] = useState(initialValues.availability);
  const [image, setImage] = useState(initialValues.image); // Use a text input for the image URL

  const addAvailability = () => {
    setAvailability([...availability, { startDate: "", endDate: "" }]);
  };

  const removeAvailability = (index) => {
    const updatedAvailability = availability.filter((_, i) => i !== index);
    setAvailability(updatedAvailability);
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;
    setAvailability(updatedAvailability);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      address,
      city,
      country,
      description,
      availability,
      image, // Pass the image URL
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)} // Update the image URL
          placeholder="Enter the image URL"
        />
      </label>
      <div className="availability-section">
        <h4>Availability:</h4>
        {availability.map((range, index) => (
          <div key={index} className="availability-range">
            <label>
              Start Date:
              <input
                type="date"
                value={range.startDate}
                onChange={(e) =>
                  handleAvailabilityChange(index, "startDate", e.target.value)
                }
                required
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={range.endDate}
                onChange={(e) =>
                  handleAvailabilityChange(index, "endDate", e.target.value)
                }
                required
              />
            </label>
          </div>
        ))}
        <div className="availability-buttons">
          <button type="button" onClick={addAvailability}>
            Add Availability
          </button>
          {availability.length > 1 && (
            <button
              type="button"
              onClick={() => removeAvailability(availability.length - 1)}
            >
              Remove Availability
            </button>
          )}
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
