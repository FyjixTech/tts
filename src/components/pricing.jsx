import React from 'react'
import upi from "../assets/UPI-Color.png"
import wallet from "../assets/wallet.png"
import cardp from "../assets/creditc.png"

const Pricing = () => {
    return (
        <>
            <div className='container mt-5'>
                <div className="row mt-5 mb-5">
                    <div className="container-fluid mt-5">
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

export default Pricing