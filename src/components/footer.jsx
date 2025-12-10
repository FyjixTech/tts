import React from 'react'
import upi from "../assets/UPI-Color.png"
import wallet from "../assets/wallet.png"
import cardp from "../assets/creditc.png"

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
              <a className='linkk' href="https://tts.fyjix.com/features">Features</a>
            </div>
            <div className="row">
              <a className='linkk' href="https://tts.fyjix.com/pricing" >Pricing</a>
            </div>
            <div className="row">
              <a className='linkk' href="https://tts.fyjix.com/faqs" >FAQ</a>
            </div>
            <div className="row">
              <a className='linkk' href="https://tts.fyjix.com/contact">Contact</a>
            </div>


          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 ">
            <div className="row">
              <span className='header'><b>Policies</b></span>
            </div>
            <div className="row">
              <a className='linkk' href="https://tts.fyjix.com/terms-and-conditions">Terms & Conditions</a>
            </div>
            <div className="row">
              <a className='linkk' href="https://tts.fyjix.com/privacy-policy">Privacy Policy</a>
            </div>
            <div className="row">
              <a className='linkk' href="https://tts.fyjix.com/refund-policy">Refund Policy</a>
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
          <div className="">
              <p className="text-sm text-gray-600">
                © 2025 Fyjix IT Solutions. Powered By Alareet Enterprises.
              </p>
              <p className="font-bold header">Any Language. One Fair Price.</p>
            </div>

          </div>
        </div>

      </div>
    </footer>)
}

export default Footer