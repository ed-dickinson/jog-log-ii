import React from 'react'
import logo from '../logo.svg';
import copyleft from '../copyleft.svg';
// {athlete.firstname} {athlete.lastname}

const Footer = () => {
  return (
    <footer>
      <span className="Left">
        <a href="https://en.wikipedia.org/wiki/Copyleft"><img src={copyleft} className="Copyleft-symbol" alt="React logo" /></a>
        2022 The Jog Loggers
      </span>
      <span className="Right">
        Made with React
        <img src={logo} className="React-logo" alt="React logo" />
      </span>
    </footer>
  )
}

export default Footer
