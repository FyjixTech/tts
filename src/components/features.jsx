import React from 'react'
import upi from "../assets/UPI-Color.png"
import wallet from "../assets/wallet.png"
import cardp from "../assets/creditc.png"
import fair from "../assets/fairness.png"
import clock from "../assets/clock.png"
import gift from "../assets/gift.png"
import lang from "../assets/translation.png"
import payment from "../assets/credit-card.png"
import headphone from "../assets/customer-service-headset.png"
import barg from "../assets/growth-graph.png"
import box from "../assets/box.png"
import doc from "../assets/file.png"
import pencil from "../assets/pencil.png"

const Features = () => {
  return (
    <>
       <div className="container pb-5 mt-5">
                <hr />
                <div className="row center mt-5">
                    <center>
                        <h3 className='header'>Why Our Users Love It</h3>
                    </center>
                </div>
                <div className="row mt-5">
                    <div className="col-sm-12 col-lg-6 col-md-6 mt-2">
                        <div className="row bg-light p-4" style={{ height: "100%" }}>
                            <div className="col center">
                                <img src={fair}  alt="" style={{ height: "50px" }} />
                            </div>
                            <div className="col center">
                                <h5>
                                    One Fair Price For All Languages
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 col-md-6  mt-2">
                        <div className="row p-4" style={{ height: "100%" }}>
                            <div className="col center">
                                <img alt="" src={clock} style={{ height: "50px" }} />
                            </div>
                            <div className="col center">
                                <h5>
                                    Never Expiring Packs
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-12 col-lg-6 col-md-6 mt-2">
                        <div className="row  p-4" style={{ height: "100%" }}>
                            <div className="col center">
                                <img alt="" src={gift} style={{ height: "50px" }} />
                            </div>
                            <div className="col center">
                                <h5>
                                    We Don't Save Your Data
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 col-md-6 mt-2">
                        <div className="row p-4 bg-light" style={{ height: "100%" }}>
                            <div className="col center">
                                <img alt="" src={lang} style={{ height: "50px" }} />
                            </div>
                            <div className="col center">
                                <h5>
                                    Multiple Languages & Accents
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-5">
                    <div className="col-sm-12 col-lg-4 col-md-4 mt-2">
                        <div className="row bg-light p-4" style={{ height: "100%" }}>
                            <div className="col center">
                                <img alt="" src={payment} style={{ height: "50px" }} />
                            </div>
                            <div className="col center">
                                <h5>
                                    Flexible Payments
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-4 col-md-4 mt-2">
                        <div className="row p-4" style={{ height: "100%" }}>
                            <div className="col center">
                                <img alt="" src={headphone} style={{ height: "50px" }} />
                            </div>
                            <div className="col center">
                                <h5>
                                    Demo-First Approach
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-4 col-md-4 mt-2">
                        <div className="row bg-light p-4" style={{ height: "100%" }}>
                            <div className="col center">
                                <img alt ="" src={barg} style={{ height: "50px" }} />
                            </div>
                            <div className="col center">
                                <h5>
                                    Bulk Discounts
                                </h5>
                            </div>
                        </div>
                    </div>

                </div>
                <hr />
            </div>
            <div className="container">
                <div className='row center'>
                    <center>
                        <h3 className='header'>Fair, Flexible Pricing. Pay Only For What you Use.</h3>
                        <h5 className='mt-3'>Buy characters upfront, use them at your own pace. No expiry, no hidden costs.</h5>
                    </center>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-4 p-3">
                        <div className="row center">
                            <img alt="" src={box} height="40px" />
                        </div>
                        <div className="row center">
                            Buy Pack
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-4 p-3">
                        <div className="row center">
                            <img alt="" src={doc} height="40px" />
                        </div>
                        <div className="row center">
                            Get Characters
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-4 p-3">
                        <div className="row center">
                            <img alt="" src={pencil} height="40px" />
                        </div>
                        <div className="row center">
                            Use As You Go
                        </div>
                    </div>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col center mt-2">
                                <div className="card p-4" style={{ height: "100%" }}>
                                    <div className="row center">
                                        <h4 className='header'><b>Starter</b></h4>
                                    </div>
                                    <div className="row center mt-2">
                                        <h2><b>₹50</b></h2>
                                    </div>
                                    <div className="row center">
                                        <span className='text-secondary'>750 chars</span>
                                    </div>
                                    <hr />
                                    <div className="row center">
                                        ₹0.066/character
                                    </div>

                                </div>
                            </div>
                            <div className="col center mt-2">
                                <div className="card p-4" style={{ height: "100%" }}>
                                    <div className="row center">
                                        <h4 className='header'><b>Student</b></h4>
                                    </div>
                                    <div className="row center mt-2">
                                        <h2><b>₹250</b></h2>
                                    </div>
                                    <div className="row center">
                                        <span className='text-secondary'>5,000 chars</span>
                                    </div>
                                    <hr />
                                    <div className="row center">
                                        ₹0.05/character
                                    </div>

                                </div>
                            </div>
                            <div className="col center mt-2">
                                <div className="card p-4" style={{ height: "100%" }}>
                                    <div className="row center">
                                        <h4 className='header'><b>Pro</b></h4>
                                    </div>
                                    <div className="row center mt-2">
                                        <h2><b>₹1,000</b></h2>
                                    </div>
                                    <div className="row center">
                                        <span className='text-secondary'>25,000 chars</span>
                                    </div>
                                    <hr />
                                    <div className="row center">
                                        ₹0.04/character
                                    </div>

                                </div>
                            </div>
                            <div className="col center mt-2">
                                <div className="card p-4" style={{ height: "100%" }}>
                                    <div className="row center">
                                        <h4 className='header'><b>Business</b></h4>
                                    </div>
                                    <div className="row center mt-2">
                                        <h2><b>₹3,000</b></h2>
                                    </div>
                                    <div className="row center">
                                        <span className='text-secondary'>80,000 chars</span>
                                    </div>
                                    <hr />
                                    <div className="row center">
                                        ₹0.037/character
                                    </div>

                                </div>
                            </div>
                            <div className="col center mt-2">
                                <div className="card p-4" style={{ height: "100%" }}>
                                    <div className="row center">
                                        <h4 className='header'><b>Enterprise</b></h4>
                                    </div>
                                    <div className="row center mt-2">
                                        <h2><b>₹5,000</b></h2>
                                    </div>
                                    <div className="row center">
                                        <span className='text-secondary'>150,000 chars</span>
                                    </div>
                                    <hr />
                                    <div className="row center">
                                        ₹0.033/character
                                    </div>

                                </div>
                            </div>
                            <div className="col center mt-2">
                                <div className="card p-4" style={{ height: "100%" }}>
                                    <div className="row center">
                                        <h4 className='header'><b>Custom</b></h4>
                                    </div>
                                    <div className="row center mt-2">
                                        <h2><b>₹ Custom</b></h2>
                                    </div>
                                    <div className="row center">
                                        <span className='text-secondary'>Custom chars</span>
                                    </div>
                                    <hr />
                                    <div className="row center">
                                        ₹ Custom/character
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className='bg-light p-4 footer'>
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
            </footer>
    </>
  )
}

export default Features