import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthContextWrapper } from "./contexts/AuthContext.jsx";
import { ListingContextWrapper } from "./contexts/ListingContext.jsx";
import { RequestContextWrapper } from "./contexts/RequestContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <ListingContextWrapper>
          <RequestContextWrapper>
            <App />
          </RequestContextWrapper>
        </ListingContextWrapper>
      </AuthContextWrapper>
    </BrowserRouter>
  </StrictMode>
);
