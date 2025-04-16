import { useEffect, useState } from "react";

export const ListingForm = ({
  // initialValues = {
  //   title: "",
  //   address: "",
  //   city: "",
  //   country: "",
  //   description: "",
  //   availability: [{ startDate: "", endDate: "" }],
  //   image: "", // Default value for the image URL
  // },

  onSubmit,
  host,
  isUpdateForm = false,
  initialValues = null,
}) => {

  const getFormattedDate = (date) => new Date(date).toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState([]); // Default to an empty array
  const [image, setImage] = useState(""); // Use a text input for the image URL
  const [imageFile, setImageFile] = useState(null);

  // const [title, setTitle] = useState(initialValues.title);
  // const [address, setAddress] = useState(initialValues.address);
  // const [city, setCity] = useState(initialValues.city);
  // const [country, setCountry] = useState(initialValues.country);
  // const [description, setDescription] = useState(initialValues.description);
  // const [availability, setAvailability] = useState(initialValues.availability || []); // Default to an empty array
  // const [image, setImage] = useState(initialValues.image); // Use a text input for the image URL
  // const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (isUpdateForm && initialValues) {
      console.log("here ==> ",initialValues);
      setTitle(initialValues.title);
      setAddress(initialValues.address);
      setCity(initialValues.city);
      setCountry(initialValues.country);
      setDescription(initialValues.description);
      setAvailability(initialValues.availability);
      setImage(initialValues.image);
    }
  }, [isUpdateForm, initialValues]);

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

    let formData;
    if (imageFile) {
      formData = new FormData();
      formData.append("listingPicture", imageFile);
      formData.append("title", title);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("description", description);
      formData.append("availability", JSON.stringify(availability));
      formData.append("host", host);
    } else {
      formData = {
        title,
        address,
        city,
        country,
        description,
        availability,
        host,
        listingPicture: image || "", // Use the image URL if no file is uploaded
      };
    }
    onSubmit(formData);
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

      <label>
        Or upload profile image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </label>

      <div className="availability-section">
        <h4>Availability:</h4>
        {availability && availability.length > 0 ? (
          availability.map((range, index) => (
            <div key={index} className="availability-range">
              <label>
                Start Date:
                <input
                  type="date"
                  value={getFormattedDate(range.startDate)}
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
                  value={getFormattedDate(range.endDate)}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "endDate", e.target.value)
                  }
                  required
                />
              </label>
            </div>
          ))
        ) : (
          <p>No availability provided.</p>
        )}
      </div>
      <div className="availability-buttons">
        <button type="button" onClick={addAvailability}>
          Add Availability
        </button>
        {availability?.length > 1 && (
          <button
            type="button"
            onClick={() => removeAvailability(availability.length - 1)}
          >
            Remove Availability
          </button>
        )}
      </div>
      <button type="submit">{isUpdateForm ? "Update" : "Submit"}</button>
    </form>
  );
};
