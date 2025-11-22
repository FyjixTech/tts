import React from 'react'
import upi from "../assets/UPI-Color.png"
import wallet from "../assets/wallet.png"
import cardp from "../assets/creditc.png"
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className='bg-light p-4 footer mt-5'>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="row">
              <span className='header'><b>Quick Links</b></span>
            </div>
            <div className="row mt-2">
              <Link className='linkk' to="/features">Features</Link>
            </div>
            <div className="row">
              <Link className='linkk' to="/pricing" >Pricing</Link>
            </div>
            <div className="row">
              <Link className='linkk' to="/faqs" >FAQ</Link>
            </div>
            <div className="row">
              <Link className='linkk' to="/contact">Contact</Link>
            </div>


          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 ">
            <div className="row">
              <span className='header'><b>Policies</b></span>
            </div>
            <div className="row">
              <Link className='linkk' to="/terms-and-conditions">Terms & Conditions</Link>
            </div>
            <div className="row">
              <Link className='linkk' to="/privacy-policy">Privacy Policy</Link>
            </div>
            <div className="row">
              <Link className='linkk' to="/refund-policy">Refund Policy</Link>
            </div>


          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 center">
            <div className="row">
              <div className="col center">
                <img alt='' src={upi} height="30px" />
              </div>
              <div className="col center">
                <img alt='' src={cardp} height="30px" />
              </div>
              <div className="col center">
                <img alt='' src={wallet} height="30px" />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 center">
            <div className="row">
              © 2025 Fyjix IT Solutions. Powered By Alareet Enterprises.
              <br />
              <span className='header'>Any Language. One Fair Price.</span>
            </div>

          </div>
        </div>

      </div>
    </footer>)
}

export default Footer