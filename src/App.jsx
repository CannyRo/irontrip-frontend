// import { useState } from 'react'

import "./App.css";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { CreateListingPage } from "./pages/CreateListingPage";
import { EditListingPage } from "./pages/EditListingPage";
import { RequestDetailPage } from "./pages/RequestDetailPage";
import { CreateRequestPage } from "./pages/CreateRequestPage";
import { EditRequestPage } from "./pages/EditRequestPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ListingsPage } from "./pages/ListingsPage";
import { RequestsPage } from "./pages/RequestsPage";

function App() {
 
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/listings" element={<ListingsPage/>} />
        <Route path="/listing/:listingId" element={<ListingDetailPage />} />
        <Route path="/create-listing" element={<CreateListingPage />} />
        <Route path="/edit-listing/:listingId" element={<EditListingPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/request/:requestId" element={<RequestDetailPage />} />
        <Route path="/listings/:listingId/request" element={<CreateRequestPage />} />
        <Route path="/edit-request/:requestId" element={<EditRequestPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;