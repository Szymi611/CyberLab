import "./Navbar.scss";
import CyberLabLogo from "../../assets/images/CyberLabLogo.png";
import { useState } from "react";

export default function Navbar() {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img
              src={CyberLabLogo}
              alt="CyberLab logo"
              className="navbar-logo-image"
            />
          </a>
        </div>

        <div
          className={`hamburger ${isHamburgerMenuOpen ? "open" : ""}`}
          onClick={toggleHamburgerMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-items ${isHamburgerMenuOpen ? "open" : ""}`}>
          <ul className="navbar-item">
            {/* <li className="navbar-list-item">
              <a href="/" className="navbar-link">Home</a>
            </li>
            <li className="navbar-list-item">
              <a href="/" className="navbar-link">About</a>
            </li> */}
            {/* <li className="navbar-list-item">
              <a href="/" className="navbar-link">Sign in</a>
            </li> */}
          </ul>
        </div>
      </nav>
      {/* <div className="navbar-underline"></div> */}
    </>
  );
}
