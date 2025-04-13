import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App.jsx";
import { AuthContextWrapper } from "./contexts/AuthContext.jsx";
import { ListingContextWrapper } from "./contexts/ListingContext.jsx";
import { BrowserRouter } from "react-router";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
      <ListingContextWrapper>
        <App />
        </ListingContextWrapper>
      </AuthContextWrapper>
    </BrowserRouter>
  </StrictMode>
);
