import { useEffect, useState } from "react";

export const ListingForm = ({
  onSubmit,
  host,
  isUpdateForm = false,
  initialValues = null,
}) => {
  const getFormattedDate = (date) => new Date(date).toISOString().split("T")[0];
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState([]); // Default to an empty array
  const [image, setImage] = useState(""); // Use a text input for the image URL
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (isUpdateForm && initialValues) {
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
    setAvailability([
      ...availability,
      {
        startDate: getFormattedDate(today),
        endDate: getFormattedDate(tomorrow),
      },
    ]);
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
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Title:
        <input
          type="text"
          placeholder="Ex: Cosy sofa in the capital of British..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          placeholder="Ex: 21 Jump Street..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City:
        <input
          type="text"
          placeholder="Ex: Vancouver"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          placeholder="Ex: Canada"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          placeholder="Ex: Spartan bed but warm welcome in a former church rehabilitated to provide accommodation."
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={7}
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
      <p>OR</p>
      <label>
        Upload image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </label>

      <div className="availability-section">
        <label>Availability:</label>
        {availability && availability.length > 0 ? (
          availability.map((range, index) => (
            <div key={index} className="availability-range">
              <div>
                <label>Start Date:</label>
                <input
                  type="date"
                  value={getFormattedDate(range.startDate)}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "startDate", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label>End Date:</label>
                <input
                  type="date"
                  value={getFormattedDate(range.endDate)}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "endDate", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))
        ) : (
          <p>(No availability provided.)</p>
        )}
      </div>
      <div className="availability-buttons">
        <button type="button" onClick={addAvailability} className="btn-form">
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
      <button type="submit" className="btn-form">
        {isUpdateForm ? "Update" : "Submit"}
      </button>
    </form>
  );
};
