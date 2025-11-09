import React, { useRef, useState, useEffect } from 'react'
import logo from "../assets/logo3.png"
import menu from "../assets/equalizer.png"
import { Link } from 'react-router';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const profileref = useRef(null);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            profileref.current &&
            !profileref.current.contains(event.target) &&
            (!profileref || !profileref.current?.contains(event.target))
          ) {
            setIsMenuOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [setIsMenuOpen, profileref]);
    

    return (
        <div className='navbaar'>
            <div className="desktop">
                <div className="container navbar-style-desktop">
                    <div className="row">
                        <div className="col-1">
                            <Link to="/"><img src={logo} className='logo' alt="Fyjix Logo" /></Link>
                        </div>
                        <div className="col-11 center">
                            <Link className='m-3 linkk' to="/features">Features</Link>
                            <div className='m-3'>Demo</div>
                            <Link className='m-3 linkk' to="/pricing">Pricing</Link>
                            <Link className='m-3 linkk' to="/faqs">FAQ</Link>
                            <Link className=' button btn' to="/login">Sign up and<br />try free demo</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="phone">
                <div className="container navbar-style-phone">
                    <div className="row">
                        <div className="col">
                            <img src={logo} className='logo' alt="Fyjix Logo" />

                        </div>
                        <div className="col">
                            <div  ref={profileref} onClick={toggleMenu}>
                               <Link to="/"><img src={menu} className='menu-icon' alt="" /></Link> 
                            </div>

                            {isMenuOpen && (
                                <>
                                    <div className='menu-active'>
                                        <div className="container">
                                            <div className="row center">
                                                <Link className='nav-menu' to="/features">Features</Link>

                                            </div>
                                            <div className="row center">
                                                <Link className='nav-menu' to="">Demo</Link>

                                            </div>
                                            <div className="row center">
                                                <Link className='nav-menu' to="/pricing">Pricing</Link>

                                            </div>
                                            <div className="row center">
                                                <Link className='nav-menu' to="/faqs">FAQ</Link>

                                            </div>
                                            <div className="row center">
                                                <Link className='nav-menu' to="">
                                                    Sign up and<br />try free demo
                                                </Link>
                                            </div>
                                        </div>


                                    </div>

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar