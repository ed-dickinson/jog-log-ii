import React from 'react'
import logo from '../logo.svg';
// {athlete.firstname} {athlete.lastname}

const Footer = () => {
  return (
    <footer>
  Made with: <img src={logo} className="React-logo" alt="React logo" />
    </footer>
  )
}

export default Footer
