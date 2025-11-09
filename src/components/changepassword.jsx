import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getEnvironment } from "../utils.js";


const ChangePassword = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConformPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = (teext) => {
        setPassword(teext)
    }
    const handleConfirmPasswordChange = (teext) => {
        setConfirmPassword(teext)
    }

    const handleUpdatePasswordClick = async () => {
        let res = true;

        if (password.trim().trim() === "") {
            res = false;
            setError("Please enter password")
            return;
        }
        if (confirmPassword.trim().trim() === "") {
            res = false;
            setError("Please confirm password")
            return;
        }

        if (password.trim().trim() !== confirmPassword.trim().trim()) {
            res = false;
            setError("Passwords Do Not Match")
            return;
        }

        if (res) {
            setLoading(true)

            const url = getEnvironment();
            const api = "tts-change-password";
            const link = url + api;
            const token = sessionStorage.getItem("accesstoken");

            const response = await fetch(link, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "newpassword": password })
            });

            const data = await response.json()
            if (response.ok) {
                setError(data.data)
            }
        }



        setLoading(false)

    }
    return (
        <>
            {loading && (
                <div className="loader"></div>
            )}
            <div className="container">
                <div className="row p-2">
                    <Typography sx={{ padding: "10px" }} variant="h6" component="h2">
                        <LockOpenIcon /> Change Password
                    </Typography>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-2 col-md-2"> New Password <sup><span className='text-danger'>*</span></sup> :</div>
                    <div className="col-sm-12 col-lg-6 col-md-6">
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
                </div>
                <div className="row mt-3 d-flex align-center">
                    <div className="col-sm-12 col-lg-2 col-md-2">Confirm Password <sup><span className='text-danger'>*</span></sup> :</div>
                    <div className="col-sm-12 col-lg-6 col-md-6">
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
                </div>
                <div className="row mt-4">
                    <div className="col">
                        {error && (

                            <>
                                {error}
                            </>
                        )}
                    </div>

                </div>
                <div className="row mt-4 mb-5">
                    <div className="col">
                        <button onClick={handleUpdatePasswordClick} className='btn' style={{ background: "#00565d", color: "#fcd941" }}>Change Password</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChangePassword