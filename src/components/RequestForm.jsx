import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const RequestForm = ({
  onSubmit,
  onDelete,
  isUpdateForm = false,
  initialData = null,
}) => {
  console.log("isUpdateForm === ", isUpdateForm);

  const getFormattedDate = (date) => new Date(date).toISOString().split("T")[0];

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [arrival, setArrival] = useState(getFormattedDate(today));
  const [departure, setDeparture] = useState(getFormattedDate(tomorrow));
  const [messageRequest, setMessageRequest] = useState("");
  const [statusRequest, setStatusRequest] = useState("Pending");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isUpdateForm && initialData) {
      setArrival(getFormattedDate(initialData.arrivalDate));
      setDeparture(getFormattedDate(initialData.departureDate));
      setMessageRequest(initialData.messageToHost || "");
      setStatusRequest(initialData.status || "Pending");
    }
  }, [isUpdateForm, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      arrivalDate: arrival,
      departureDate: departure,
      messageToHost: messageRequest,
      status: statusRequest,
    };
    onSubmit(formattedData);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="listing-card-date">
        <div className="form-control">
          <label>Start: </label>
          <input
            type="date"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            required
            className="flex-grow"
          />
        </div>
        <div className="form-control">
          <label>
            End:</label>
            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
              className="flex-grow"
            />
          
        </div>
      </div>

      <label>
        Message:
        <textarea
          placeholder="Type your message here..."
          value={messageRequest}
          onChange={(e) => setMessageRequest(e.target.value)}
          required
          rows={7}
        >
          {messageRequest}
        </textarea>
      </label>
      {isUpdateForm === true && user?.id === initialData?.host?._id && (
        <div className="radio-button-container">
          <label>Request status:</label>
          <div className="radio-button-group">
            <label
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                justifyContent: "space-between",
              }}
            >
              Pending
              <input
                type="radio"
                value="Pending"
                checked={statusRequest === "Pending"}
                onChange={(e) => setStatusRequest(e.target.value)}
                style={{ width: "10rem" }}
              />
            </label>

            <label
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                justifyContent: "space-between",
              }}
            >
              Accepted
              <input
                type="radio"
                value="Accepted"
                checked={statusRequest === "Accepted"}
                onChange={(e) => setStatusRequest(e.target.value)}
                style={{ width: "10rem" }}
              />
            </label>

            <label
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                justifyContent: "space-between",
              }}
            >
              Rejected
              <input
                type="radio"
                value="Rejected"
                checked={statusRequest === "Rejected"}
                onChange={(e) => setStatusRequest(e.target.value)}
                style={{ width: "10rem" }}
              />
            </label>
          </div>
        </div>
      )}

      <button type="submit" className="btn-form">
        {isUpdateForm ? "Update" : "Submit"}
      </button>
      {isUpdateForm === true && user?.id === initialData?.traveler?._id && (
        <button type="button" onClick={handleDelete} className="btn-form">
          Delete
        </button>
      )}
    </form>
  );
};
