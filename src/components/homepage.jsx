import React from 'react'
import Login from "./login"
import www from "../assets/www.png"
import msg from "../assets/comment.png"
import vol from "../assets/volume-up-interface-symbol.png"
import fair from "../assets/fairness.png"
import clock from "../assets/clock.png"
import gift from "../assets/gift.png"
import lang from "../assets/translation.png"
import payment from "../assets/credit-card.png"
import headphone from "../assets/customer-service-headset.png"
import barg from "../assets/growth-graph.png"
import upi from "../assets/UPI-Color.png"
import wallet from "../assets/wallet.png"
import cardp from "../assets/creditc.png"
import box from "../assets/box.png"
import doc from "../assets/file.png"
import pencil from "../assets/pencil.png"
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import Faq from './faq'
import add from "../assets/add.png"
import verified from "../assets/verified.png"


const Homepage = () => {
    const navigate = useNavigate();
    const naviageToLogin = () => {
        navigate("/login")
    }
    const naviagteToRegister = () => {
        navigate("/new-user")
    }
    return (
        <div className='homepage'>
            <div className='container'>
                <div className="row">
                    <div className="col-sm-12 col-lg-6 col-md-6 center2">
                        <div className="row">
                            <h1><b>Give Your Words A Voice. In Any Language. In Any Accent. At One Fair Price.</b></h1>
                        </div>
                        <div className="row">
                            <h3>
                                Text-To-Speech tailored for everyone. Creators, Students, and Businesses.
                            </h3>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 col-md-6 mt-5">
                        <Login />
                    </div>
                </div>

            </div>

            <div className="container marginised">
                <hr />
                <div className='row center mt-5 mb-5'>
                    <center>
                        <h2 className='header'>Try Before You Buy</h2>
                        <h5 className='mt-4'>Type upto 5000 words and hear them instantly. Sign up free to generate and download your audio</h5>
                    </center>
                </div>
                <hr />
            </div>

            <div className="container">
                <div className='row center mt-5 mb-5'>
                    <center>
                        <h2 className='header'>Get Started</h2>
                    </center>
                </div>
                <div className='row center mt-5 mb-5 w-100'>
                    <div className="col-sm-12 col-lg-6 col-md-6 p-3 bg-light center">
                        <div className="container">
                            <div className="row center">
                                <img src={add} loading='lazy' className='step-img' alt=""></img>
                            </div>
                            <div className="row center mt-3">
                                <h5>Register With Your Email</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 col-md-6 p-3 center">
                        <div className="container">
                            <div className="row center">
                                <img src={verified} loading='lazy' className='step-img' alt=""></img>
                            </div>
                            <div className="row center mt-3">
                                <h5>Verify Your Email</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>

            <div className="container mt-4 mb-5">
                <div className="row center mt-5">
                    <center>
                        <h3 className='mt-3'>Text-To-Speech in 3 simple steps</h3>
                    </center>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-2 p-3">
                        <div className="row center number-button">1</div>
                        <div className="row center mt-2">
                            <img loading='lazy' src={msg} className='step-img' alt=""></img>
                        </div>
                        <div className="row center mt-2">
                            <h5>Enter Your Text</h5>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-lg-4 bg-light mt-2  p-3">
                        <div className="row center number-button">2</div>
                        <div className="row center mt-2">
                            <img src={www} loading='lazy' className='step-img' alt=""></img>
                        </div>
                        <div className="row center mt-2">
                            <h5>Select Language & Tone</h5>

                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-2  p-3">
                        <div className="row center number-button">3</div>
                        <div className="row center mt-2">
                            <img src={vol} loading='lazy' className='step-img' alt=""></img>
                        </div>
                        <div className="row center mt-2">
                            <center>
                                <h5>Generate and Download Audio</h5>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
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
                                <img src={fair} loading='lazy' alt="" style={{ height: "50px" }} />
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
                                <img alt="" loading='lazy' src={clock} style={{ height: "50px" }} />
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
                                <img alt="" loading='lazy' src={gift} style={{ height: "50px" }} />
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
                                <img alt="" loading='lazy' src={lang} style={{ height: "50px" }} />
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
                                <img alt="" loading='lazy' src={payment} style={{ height: "50px" }} />
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
                                <img alt="" loading='lazy' src={headphone} style={{ height: "50px" }} />
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
                                <img alt="" loading='lazy' src={barg} style={{ height: "50px" }} />
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
                            <img alt="" loading='lazy' src={box} height="40px" />
                        </div>
                        <div className="row center">
                            Buy Pack
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-4 p-3">
                        <div className="row center">
                            <img alt="" loading='lazy' src={doc} height="40px" />
                        </div>
                        <div className="row center">
                            Get Characters
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-4 p-3">
                        <div className="row center">
                            <img alt="" loading='lazy' src={pencil} height="40px" />
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

            <div className='banner p-5 mt-4'>
                <div className="container p-5 center">
                    <div className="row center">
                        <center>
                            <h1 className='text-white'><b>Ready To Hear The Difference?</b></h1>
                            <h3 className='text-white mt-4'>Sign up today and start turning your text into audio.</h3>
                            <br />
                            <br />
                            <br />
                            <div className="row center">
                                <div className="col center mt-3">
                                    <span className='btn button2' onClick={naviageToLogin} style={{ width: "250px" }}><h4>Try Free Demo</h4></span>
                                </div>
                                <div className="col center mt-3">
                                    <span className='btn button3' onClick={naviagteToRegister}><h4>Sign Up</h4></span>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
            <div className="container pb-5 mt-5">
                <Faq />
            </div>
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
            </footer>
        </div>


    )
}

export default Homepage