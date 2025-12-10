import React, { useState, useEffect } from 'react';
import box from "../assets/box.png"
import doc from "../assets/file.png"
import pencil from "../assets/pencil.png"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { getEnvironment } from "../utils.js"
import Alert from '@mui/material/Alert';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Typography,
} from "@mui/material";
import { useNavigate } from 'react-router';


const QR_TTL_SECONDS = 15 * 60; // 15 minutes

const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
        .toString()
        .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

const PaymentPlans = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [qrImage, setQrImage] = useState(null);
    const [qrGeneratedAt, setQrGeneratedAt] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(QR_TTL_SECONDS);
    const [paymentPlan, setPaymentPlan] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");
    const [emailVerifyMsg, setEmailVerifyMsg] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [close, setClose] = useState(false)
    const [done, setDone] = useState(true)

    const navigate = useNavigate()

    const clearData = () => {
        navigate("/app/my-payments")
        setDialogOpen(false)
    }

    const handleConfirmPayment = async () => {
        try {
            const token = sessionStorage.getItem("accesstoken");
            const url = getEnvironment();
            const api = "tts-confirm-payment";
            const link = url + api;
            const payload = {
                transactionId: transactionId,
            };
            const response = await fetch(link, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setError("")
                setClose(false)
                setDone(true)
                setSuccess(data.data)
            }
            else {
                setSuccess("")
                setError(data.data)
            }
        }
        catch (error) {
            setError("Payment confirmation failed.");
        }
    }

    useEffect(() => {
        let interval;
        if (qrGeneratedAt) {
            interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - qrGeneratedAt) / 1000);
                const remaining = QR_TTL_SECONDS - elapsed;
                if (remaining <= 0) {
                    clearInterval(interval);
                    setQrImage(null);
                    setError("");
                    setQrGeneratedAt(null);
                    setSecondsLeft(QR_TTL_SECONDS);
                } else {
                    setSecondsLeft(remaining);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [qrGeneratedAt]);


    const handleSetPaymentPlan = async (payPrice, chars) => {
        setPaymentPlan(payPrice)
        try {
            const token = sessionStorage.getItem("accesstoken");
            const url = getEnvironment();
            const api = "tts-generate-qr-code";
            const link = url + api;
            const payload = {
                payPrice: payPrice,
                chars: chars,
            };
            const response = await fetch(link, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.data === "EMAIL") {

                setEmailSuccess("Your enquiry has been sent.")
            }
            else if (data.data === "EMAILVERIFY") {
                setEmailVerifyMsg(data.amount)
            }
            else {
                setQrImage(data.data)
                setClose(true)
                setDone(false)
                setTransactionId(data.txn_id)
                setDialogOpen(true)
                setQrGeneratedAt(Date.now());
            }
        }
        catch (error) {
            console.error(error)
            setError(error)
        }
    }

    return (
        <>
            <div className="container p-5">
                <div className='row center'>
                    <center>
                        <h3 className='header'>Fair, Flexible Pricing. Pay Only For What you Use.</h3>
                        <h5 className='mt-3'>Buy characters upfront, use them at your own pace. No expiry, no hidden costs.</h5>
                    </center>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-4 p-3">
                        <div className="row center">
                            <img alt='' src={box} height="40px" />
                        </div>
                        <div className="row center">
                            Buy Pack
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-4 p-3">
                        <div className="row center">
                            <img alt='' src={doc} height="40px" />
                        </div>
                        <div className="row center">
                            Get Characters
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 mt-4 p-3">
                        <div className="row center">
                            <img alt='' src={pencil} height="40px" />
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
                                    <div className="row center mt-3">
                                        <span onClick={() => handleSetPaymentPlan(50, 750)} className='btn button2'>Choose Plan</span>
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
                                    <div className="row center mt-3">
                                        <span onClick={() => handleSetPaymentPlan(250, 5000)} className='btn button2'>Choose Plan</span>
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
                                    <div className="row center mt-3">
                                        <span onClick={() => handleSetPaymentPlan(1000, 25000)} className='btn button2'>Choose Plan</span>
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
                                    <div className="row center mt-3">
                                        <span onClick={() => handleSetPaymentPlan(3000, 80000)} className='btn button2'>Choose Plan</span>
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
                                    <div className="row center mt-3">
                                        <span onClick={() => handleSetPaymentPlan(5000, 150000)} className='btn button2'>Choose Plan</span>
                                    </div>
                                    <hr />
                                    <div className="row center">
                                        ₹0.033/character
                                    </div>
                                </div>
                            </div>
                            <div className="col center mt-2">
                                <div className="card p-3" style={{ height: "100%" }}>
                                    <div className="row center">
                                        <h4 className='header'><b>Custom</b></h4>
                                    </div>
                                    <div className="row center mt-2">
                                        <h2><b>₹ Custom</b></h2>
                                    </div>
                                    <div className="row center">
                                        <span className='text-secondary'>Custom chars</span>
                                    </div>
                                    <div className="row center mt-3">
                                        <span onClick={() => handleSetPaymentPlan(9000, 9000)} className='btn button2'>Choose Plan</span>
                                    </div>
                                    <hr />
                                    <div className="row center">
                                        ₹ Custom/character
                                    </div>
                                </div>

                            </div>
                        </div>
                        {emailSuccess && (
                            <Alert severity="success" className='mt-4'>
                                {emailSuccess}
                            </Alert>
                        )}
                        {emailVerifyMsg && (
                            <Alert severity="warning" className='mt-4'>
                                {emailVerifyMsg}
                            </Alert>
                        )}
                    </div>
                </div>
            </div>

            <Dialog disableEscapeKeyDown open={dialogOpen} fullWidth onClose={() => { }}>
                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success">
                        {success}
                    </Alert>
                )}
                <DialogTitle>Make a Payment</DialogTitle>
                <DialogContent>
                    {qrImage && (
                        <div style={{ textAlign: "center", marginTop: 16 }}>
                            <Typography>
                                This code will expire in {formatTime(secondsLeft)}
                            </Typography>
                            <Typography>
                                <b>You will pay ₹{paymentPlan} to Alareet Enterprises</b>
                            </Typography>
                            <img src={qrImage} alt="UPI QR Code" style={{ marginTop: 8 }} />
                        </div>
                    )}

                    <div style={{ textAlign: "left", marginTop: 16 }}>
                        <div className="card p-2">
                            <div className="row">
                                <div className="col-1 center ml-3" >
                                    <AccountBalanceIcon />
                                </div>
                                <div className="col-9">Net Banking
                                    <br />
                                    <span className="text-secondary"><i>Coming soon...</i></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: "left", marginTop: 16 }}>
                        <div className="card p-2">
                            <div className="row">
                                <div className="col-1 center ml-3" >
                                    <CreditCardIcon />
                                </div>
                                <div className="col-9">Pay via Card
                                    <br />
                                    <span className="text-secondary"><i>Coming soon...</i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <button disabled={close} className="btn my-button bg-secondary text-white" onClick={clearData}>Close</button>
                    <button
                        className="btn my-button bg-success text-white"
                        onClick={handleConfirmPayment}
                        disabled={done}
                    >
                        Done
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PaymentPlans