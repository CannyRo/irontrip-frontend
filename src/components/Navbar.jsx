import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router'

export const Navbar = () => {
  const { isLoggedIn, user, handleLougoutuser } = useContext(AuthContext);
  useEffect(()=>{
    console.log("user ==> ",user);
  },[user])
  return (
    <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        {isLoggedIn && (
        <> 
          <Link to="/profile"> <button>My Listings</button> </Link>
          <Link to="/profile"> <button>My Request</button> </Link>
          <Link to="/profile"> <button>My Profile</button> </Link>
          <button onClick={handleLougoutuser}>Logout</button>
        </>
      )}
        {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  )
}
