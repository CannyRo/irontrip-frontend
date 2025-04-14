// import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { SignupPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { ListingDetailPage } from './pages/ListingDetailPage'
import { CreateListingPage } from './pages/CreateListingPage'
import { EditListingPage } from './pages/EditListingPage'
import { RequestDetailPage } from './pages/RequestDetailPage'
import { CreateRequestPage } from './pages/CreateRequestPage'
import { EditRequestPage } from './pages/EditRequestPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { Navbar } from './components/Navbar'
import { ListingsPage } from './pages/ListingsPage'
import { AuthContextWrapper } from './contexts/AuthContext'

function App() {
 
  return (
    <>
    <Navbar/>
    <AuthContextWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/listing/:listingId" element={<ListingDetailPage />} />
        <Route path="/create-listing" element={<CreateListingPage /> } />
        <Route path="/edit-listing/:listingId" element={<EditListingPage />} />
        <Route path="/request/:requestId" element={<RequestDetailPage />} />
        <Route path="/create-request" element={<CreateRequestPage /> } />
        <Route path="/edit-request/:requestId" element={<EditRequestPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </AuthContextWrapper>
    </>
  )
}

export default App
