import React, { useRef, useState, useEffect } from 'react';
import logo from "../assets/logo3.png";
import menu from "../assets/equalizer.png";
import { Link } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileref = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileref.current && !profileref.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbaar">

      {/* Desktop Navbar */}
      <div className="desktop">
        <div className="container navbar-style-desktop">
          <div className="row">
            <div className="col-1">
              <Link to="/">
                <img src={logo} className="logo" alt="Fyjix Logo" />
              </Link>
            </div>

            <div className="col-11 center">
              <Link className="m-3 linkk" to="/features">Features</Link>
              <Link className="m-3 linkk" to="/languages">Languages</Link>
              <Link className="m-3 linkk" to="/new-user">Demo</Link>
              <Link className="m-3 linkk" to="/pricing">Pricing</Link>
              <Link className="m-3 linkk" to="/about-fyjix-tts">About</Link>
              <Link className="m-3 linkk" to="/faqs">FAQ</Link>

              <Link className="button btn" to="/login">
                Sign up and<br />try free demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="phone">
        <div className="container navbar-style-phone">
          <div className="row">

            {/* Logo */}
            <div className="col">
              <Link to="/">
                <img src={logo} className="logo" alt="Fyjix Logo" />
              </Link>
            </div>

            {/* Menu Icon */}
            <div className="col" ref={profileref}>
              <img
                src={menu}
                className="menu-icon"
                alt="menu"
                onClick={toggleMenu}
              />

              {isMenuOpen && (
                <div
                  className="menu-active"
                  onClick={(e) => e.stopPropagation()} // Prevent closing on inside click
                >
                  <div className="container">

                    <div className="row center">
                      <Link className="nav-menu" to="/features">Features</Link>
                    </div>

                    <div className="row center">
                      <Link className="nav-menu" to="/languages">Languages</Link>
                    </div>

                    <div className="row center">
                      <Link className="nav-menu" to="/new-user">Demo</Link>
                    </div>

                    <div className="row center">
                      <Link className="nav-menu" to="/pricing">Pricing</Link>
                    </div>

                    <div className="row center">
                      <Link className="m-3 linkk" to="/about-fyjix-tts">About</Link>
                    </div>

                    <div className="row center">
                      <Link className="nav-menu" to="/faqs">FAQ</Link>
                    </div>

                    <div className="row center">
                      <Link className="nav-menu" to="/login">
                        Sign up and<br />try free demo
                      </Link>
                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
