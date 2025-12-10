import React, { useState } from 'react'
import logo from "../assets/logo3.png"
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import { getEnvironment } from "../utils.js";
import { Link, useNavigate } from 'react-router';
import { UAParser } from 'ua-parser-js';
import Privacypolicy from './privacypolicy.jsx';
import Termsconditions from './termsconditions.jsx';
import Refundpolicy from './refundpolicy.jsx';

const style = {
    position: 'absolute',
    overflowY: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxHeight: '75vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const NewUser = () => {
    const [loading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPassword, setShowPassword] = useState(false);
    const nagivate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    function getClientInfo() {
        const parser = new UAParser();
        const result = parser.getResult();
        return {
            browser: `${result.browser.name || "Unknown"} ${result.browser.version || ""}`,
            os_info: `${result.os.name || "Unknown"} ${result.os.version || ""}`,
            device_type: result.device.type || "Desktop", // could be 'mobile', 'tablet', etc.
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language || "Unknown",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        };
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConformPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleEmailChange = (teext) => {
        setEmail(teext)
    }
    const handlePasswordChange = (teext) => {
        setPassword(teext)
    }
    const handleConfirmPasswordChange = (teext) => {
        setConfirmPassword(teext)
    }

    const handleRegisterClick = async () => {
        let result = true;
        setError("")
        let errors = [];

        if (email.trim() === "") {
            errors.push("Please Enter Email");
        }
        if (password.trim() === "") {
            errors.push("Please Enter Password");
        }
        if (confirmPassword.trim() === "") {
            errors.push("Please Confirm Password");
        }
        if (confirmPassword.trim() !== password.trim()) {
            errors.push("Passwords Do Not Match");
        }
        if (isChecked === false) {
            errors.push("Please check Terms and Conditions");
        }

        if (errors.length > 0) {
            setError(errors.join(", "));
            return false;
        }

        setIsLoading(true);

        if (result) {
            setIsLoading(true)
            const url = getEnvironment();
            const api = "tts-add-new-user";
            const link = url + api;
            const payload = {
                email: email.trim().trim(),
                password: password.trim().trim(),
                logData: getClientInfo()
            };

            const response = await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                if (data.msg === "failure") {
                    setError(data.data)
                }
                else {
                    sessionStorage.setItem("accesstoken", data.access_token)
                    nagivate("/app/my-account")
                }
            }
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className="container">
                {loading && (
                    <div className="loader"></div>
                )}
                {error && (
                    <Alert className="fixed-alert" severity="error" >
                        {error}
                    </Alert>
                )}
                <div className="card newUserCard mt-1">
                    <div className="container p-4">
                        <div className="row mb-4">
                            <div className="col">
                                <img alt='' src={logo} className='logoNewUser' />
                            </div>
                            <div className="col">
                                <Typography variant="h4" component="h1" gutterBottom>
                                    Register
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Welcome to Fyjix
                                </Typography>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <TextField
                                fullWidth
                                type='email'
                                onChange={(e) => handleEmailChange(e.target.value)}
                                label="Email"
                                variant="outlined"
                            />
                        </div>
                        <div className="row mb-4" >
                            <TextField
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                label="Password"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                                aria-label="toggle password visibility"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                        <div className="row mb-2" >
                            <TextField
                                fullWidth
                                type={showConfirmPassword ? "text" : "password"}
                                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                label="Confirm Password"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={toggleConformPasswordVisibility}
                                                edge="end"
                                                aria-label="toggle password visibility"
                                            >
                                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className="row mb-2">
                            <div className="col-1">
                                <input class="form-check-input"
                                    type="checkbox"
                                    id="myCheckbox"
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    value="myValue" />
                            </div>
                            <div className="col-11">
                                <span onClick={handleOpen} class="linklike">Accept Terms, Conditions & Privacy Policy</span>
                            </div>
                        </div>
                        <div className="row" >
                            <button
                                className='btn btn-success w-100'
                                onClick={handleRegisterClick}
                            >
                                Register
                            </button>
                        </div>
                        <div className="row mt-2" >
                            <div className="container text-capitalize">
                                <Link to="/">Already Have an Account? Login Here</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Terms, Conditions, Policies & Privacy
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <p className="text-danger">
                                    Fyjix does not permit generation of content promoting hate, harm, or harassment. We employ automated filters to block such material, but no system is perfect. If prohibited content is created despite these measures, responsibility lies solely with the user. By using this service, you agree not to create or distribute harmful content.
                                </p>

                                <div className="container m-3">
                                    <Privacypolicy/>
                                </div>
                                <div className="container m-3">
                                    <Termsconditions/>
                                </div>
                                <div className="container m-3">
                                    <Refundpolicy/>
                                </div>
                               
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default NewUser