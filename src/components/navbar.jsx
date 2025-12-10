import React, { useRef, useState, useEffect } from 'react';
import logo from '../assets/logo3.png';
import menu from '../assets/equalizer.png';

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

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm w-100 pt-3 pb-3">
      <div className="container-fluid px-4">
        {/* Logo */}
        <a className="navbar-brand" href="https://tts.fyjix.com/">
          <img 
            src={logo} 
            alt="Fyjix Logo" 
            height="48" 
            className="d-inline-block align-top"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="collapse navbar-collapse d-none d-lg-flex justify-content-center align-content-center">
          <ul className="navbar-nav gap-3 fs-5 fw-semibold">
            <li className="nav-item">
              <a className="mt-2 nav-link text-black" href="https://tts.fyjix.com/features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="mt-2  nav-link text-black" href="https://tts.fyjix.com/languages">
                Languages
              </a>
            </li>
            <li className="nav-item">
              <a className="mt-2 nav-link text-black" href="https://tts.fyjix.com/pricing">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="mt-2 nav-link text-black" href="https://tts.fyjix.com/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="mt-2 nav-link text-black" href="https://tts.fyjix.com/faq">
                FAQ
              </a>
            </li>
            <li className="mt-2 nav-item">
            <a 
                className="btn btn-primary px-6 py-2 rounded-lg transition" 
                href="https://tts.fyjix.com/free-demo"
              >
                Try Free Demo
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <div className="d-lg-none position-relative" ref={profileref}>
          <img
            src={menu}
            alt="menu"
            height="32"
            width="32"
            className="cursor-pointer"
            onClick={toggleMenu}
            style={{ cursor: 'pointer' }}
          />

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div
              className="position-absolute end-0 mt-2 bg-white rounded shadow-lg py-2"
              style={{ 
                width: '12rem', 
                zIndex: 1050,
                right: 0 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <a 
                className="dropdown-item px-3 py-2 text-black" 
                href="https://tts.fyjix.com/features"
              >
                Features
              </a>
              
              <a 
                className="dropdown-item px-3 py-2 text-black" 
                href="https://tts.fyjix.com/languages"
              >
                Languages
              </a>
              
              <a 
                className="dropdown-item px-3 py-2 text-black" 
                href="https://tts.fyjix.com/pricing"
              >
                Pricing
              </a>
              
              <a 
                className="dropdown-item px-3 py-2 text-black" 
                href="https://tts.fyjix.com/about"
              >
                About
              </a>
              
              <a 
                className="dropdown-item px-3 py-2 text-black" 
                href="https://tts.fyjix.com/faq"
              >
                FAQ
              </a>

              <a 
                className="btn btn-primary px-6 py-2 rounded-lg transition" 
                href="https://tts.fyjix.com/free-demo"
              >
                Try Free Demo
              </a>
              
              
            
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;