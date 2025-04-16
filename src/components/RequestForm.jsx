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

      // console.log("user?.id == ",user?.id);
      // console.log("initialData?.host?.id == ", initialData?.host?.id);
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
    <form onSubmit={handleSubmit}>
      <label>
        Start Date:
        <input
          type="date"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          value={messageRequest}
          onChange={(e) => setMessageRequest(e.target.value)}
          required
        >
          {messageRequest}
        </textarea>
      </label>
      {isUpdateForm === true && user?.id === initialData?.host?._id && (
        <div>
          <label>Request status:</label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
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

      <button type="submit">{isUpdateForm ? "Update" : "Submit"}</button>
      {isUpdateForm === true && user?.id === initialData?.traveler?._id && (
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </form>
  );
};
