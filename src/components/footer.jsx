import React from 'react'
import upi from "../assets/UPI-Color.png"
import wallet from "../assets/wallet.png"
import cardp from "../assets/creditc.png"

const Footer = () => {
  return (
    <footer className='bg-light p-4 footer mt-5'>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="row">
              <span className='header'><b>Quick Links</b></span>
            </div>
            <div className="row mt-2">
              <span >Features</span>
            </div>
            <div className="row">
              <span >Pricing</span>
            </div>
            <div className="row">
              <span >FAQ</span>
            </div>
            <div className="row">
              <span >Contact</span>
            </div>

          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 center">
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
          <div className="col-sm-12 col-md-4 col-lg-4 center">
            <div className="row">
              © 2025 Fyjix IT Solutions
              <br />
              <span className='header'>Any Language. One Fair Price.</span>
            </div>

          </div>
        </div>

      </div>
    </footer>)
}

export default Footer