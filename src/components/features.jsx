import React from 'react'
import fair from "../assets/fairness.png"
import clock from "../assets/clock.png"
import gift from "../assets/gift.png"
import lang from "../assets/translation.png"
import payment from "../assets/credit-card.png"
import headphone from "../assets/customer-service-headset.png"
import barg from "../assets/growth-graph.png"

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
                                <img src={fair} alt="" style={{ height: "50px" }} />
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
                                <img alt="" src={barg} style={{ height: "50px" }} />
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
         
            </div>
        </>
    )
}

export default Features