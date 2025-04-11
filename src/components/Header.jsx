import React from 'react'
import { Link } from 'react-router'
import { Navbar } from './Navbar'

export const Header = () => {
  return (
    <header>
        <Link to="/">
        <h1>IRONTRIP</h1>
        </Link>
        <Navbar/>
    </header>
  )
}
