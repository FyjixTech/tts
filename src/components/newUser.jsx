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
                    nagivate("/my-account")
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
                                Terms, Conditions & Privacy
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <p className="text-danger">
                                    Fyjix does not permit generation of content promoting hate, harm, or harassment. We employ automated filters to block such material, but no system is perfect. If prohibited content is created despite these measures, responsibility lies solely with the user. By using this service, you agree not to create or distribute harmful content.
                                </p>
                                <p>
                                    <ul>
                                        <li>
                                            <strong>Privacy Policy</strong>
                                            <ul>
                                                <li><strong>Effective Date:</strong> 2025</li>
                                                <li><strong>Operated by:</strong> Fyjix IT Solutions (India)</li>
                                                <li>
                                                    This Privacy Policy explains how Fyjix collects, uses, stores, and protects personal information when you access or use our text-to-speech service (the "Service"). By using the Service, you agree to the practices described in this Policy. If you do not agree with this Policy, please discontinue use of the Service.
                                                </li>

                                                    <strong>1. Information We Collect</strong>
                                                    <ul>
                                                        <li>We collect only the information necessary to operate the Service, maintain security, and prevent misuse.</li>

                                                            <strong>1.1 Account Information</strong>
                                                            <ul>
                                                                <li>Email address (required)</li>
                                                                <li>Name and contact number (optional)</li>
                                                            </ul>

                                                            <strong>1.2 Usage and Log Data</strong>
                                                            <ul>
                                                                <li>IP address</li>
                                                                <li>Text input submitted for generating audio</li>
                                                                <li>User actions on the platform</li>
                                                                <li>Character usage logs</li>
                                                                <li>Character count history</li>
                                                            </ul>

                                                            <strong>1.3 Payment Information</strong>
                                                            <ul>
                                                                <li>We do not store any payment card details.</li>
                                                                <li>Payments are processed securely through the TJSB Bank payment gateway.</li>
                                                            </ul>

                                                            <strong>1.4 Cookies and Tracking</strong>
                                                            <ul>
                                                                <li>We do not use tracking cookies, analytics tools, or advertising pixels.</li>
                                                                <li>We use session cookies only for login and secure account operation.</li>
                                                            </ul>

                                                            <strong>1.5 Generated Audio</strong>
                                                            <ul>
                                                                <li>We do not store, save, archive, or retain any audio generated through the Service.</li>
                                                            </ul>
                                                    </ul>

                                                    <strong>2. How We Use Your Information</strong>
                                                    <ul>
                                                        <li>Account creation and authentication</li>
                                                        <li>Operating and improving the Service</li>
                                                        <li>Monitoring usage and maintaining platform security</li>
                                                        <li>Detecting abuse or unauthorized activity</li>
                                                        <li>Processing payments and providing purchased services</li>
                                                        <li>Communicating essential service updates</li>
                                                        <li>We do not use your information for advertising or profiling.</li>
                                                    </ul>

                                                    <strong>3. Data Retention</strong>
                                                    <ul>
                                                        <li>Text input logs, IP addresses, and user activity logs are retained for one year.</li>
                                                        <li>If suspicious, abusive, or illegal behaviour is detected, relevant logs may be stored indefinitely for security, investigation, or compliance reasons.</li>
                                                        <li>Account information is retained as long as your account is active.</li>
                                                        <li>When a user deletes their account, we will delete associated personal data within 30 days, except logs kept for security or legal purposes.</li>
                                                    </ul>

                                                    <strong>4. Security Measures</strong>
                                                    <ul>
                                                        <li>Encryption of data during transmission</li>
                                                        <li>Secure hosting infrastructure (Render)</li>
                                                        <li>Access controls and restricted administrative access</li>
                                                        <li>Regular platform monitoring for suspicious behaviour</li>
                                                        <li>While we take every reasonable measure, no system is completely immune from security risks.</li>
                                                    </ul>

                                                    <strong>5. Sharing of Data</strong>
                                                    <ul>
                                                        <li>We do not sell, rent, or trade your information.</li>
                                                        <li>We do not share user data with third parties except in the following cases:</li>

                                                        <li>
                                                            <strong> Payment Processing</strong>
                                                            <ul>
                                                                <li>Information necessary for payment processing is handled directly by TJSB Bank.</li>
                                                            </ul>
                                                        </li>

                                                        <li>
                                                            <strong>Legal Compliance</strong>
                                                            <ul>
                                                                <li>We may disclose information if required to:</li>
                                                                <li>Comply with applicable law</li>
                                                                <li>Respond to lawful requests</li>
                                                                <li>Protect the rights and safety of Fyjix or its users</li>
                                                            </ul>
                                                        </li>

                                                        <li>
                                                            <strong>Business Transfers</strong>
                                                            <ul>
                                                                <li>If Fyjix IT Solutions merges, is acquired, or undergoes restructuring, user data may be transferred to the new entity under the same privacy protections outlined here.</li>
                                                            </ul>
                                                        </li>
                                                    </ul>

                                                    <strong>6. User Rights</strong>
                                                    <ul>
                                                        <li>
                                                            <strong> Account Deletion</strong>
                                                            <ul>
                                                                <li>You may delete your account at any time.</li>
                                                                <li>After the request, we will delete your personal data within 30 days, except logs kept for security or compliance.</li>
                                                            </ul>
                                                        </li>

                                                        <li>
                                                            <strong>Correction of Information</strong>
                                                            <ul>
                                                                <li>If your stored information is incorrect, you may request correction through our support team.</li>
                                                            </ul>
                                                        </li>

                                                        <li>
                                                            <strong>Data Copy</strong>
                                                            <ul>
                                                                <li>We do not provide copies of internal logs or stored data.</li>
                                                            </ul>
                                                        </li>
                                                    </ul>

                                                <li>
                                                    <strong>7. Children’s Privacy</strong>
                                                    <ul>
                                                        <li>Fyjix is intended for general use.</li>
                                                        <li>Users under 18 should use the Service with guardian supervision.</li>
                                                        <li>We do not knowingly collect personal data specifically targeting children.</li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <strong>8. International Users</strong>
                                                    <ul>
                                                        <li>If you access the Service from outside India, you consent to processing in India where Fyjix IT Solutions operates.</li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <strong>9. Third-Party Services</strong>
                                                    <ul>
                                                        <li>Our Service uses:</li>
                                                        <li>Render for hosting</li>
                                                        <li>TJSB Bank for payment processing</li>
                                                        <li>These providers have their own privacy practices. We are not responsible for policies of external services.</li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <strong>10. Changes to This Policy</strong>
                                                    <ul>
                                                        <li>We may update this Privacy Policy periodically.</li>
                                                        <li>Significant changes will be posted on our website.</li>
                                                        <li>Continued use of the Service means you accept the updated terms.</li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <strong>11. Contact Us</strong>
                                                    <ul>
                                                        <li>If you have questions or requests related to privacy, contact:</li>
                                                        <li>Email: info@fyjix.com</li>
                                                        <li>Company: Fyjix IT Solutions</li>
                                                        <li>Country: India</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>Terms and Conditions</strong>
                                            <ul>
                                                <li><strong>Effective Date:</strong> 2025</li>
                                                <li><strong>Operated by:</strong> Fyjix IT Solutions (India)</li>
                                                <li>
                                                    These Terms and Conditions govern your access to and use of the Fyjix text-to-speech service (the "Service"). By creating an account, accessing the platform, or using any feature of the Service, you agree to be bound by these Terms.
                                                </li>

                                                    <strong>1. Definitions</strong>
                                                    <ul>
                                                        <li><strong>Service</strong> refers to the Fyjix text-to-speech (TTS) platform and its features.</li>
                                                        <li><strong>User</strong>, <strong>you</strong>, or <strong>your</strong> refers to any individual or entity using the Service.</li>
                                                        <li><strong>We</strong>, <strong>us</strong>, or <strong>our</strong> refers to Fyjix IT Solutions.</li>
                                                        <li><strong>Generated Audio</strong> means the audio file created using your text input.</li>
                                                        <li><strong>Account</strong> means a registered user profile created with a verified email.</li>
                                                    </ul>

                                                    <strong>2. Eligibility</strong>
                                                    <ul>
                                                        <li>You must register with a valid verified email to use paid features.</li>
                                                        <li>Users under 18 should use the Service with guardian consent.</li>
                                                    </ul>

                                                    <strong>3. User Accounts</strong>
                                                    <ul>
                                                        <li>Registration with a verified email is required.</li>
                                                        <li>We store:</li>
                                                        <li>Email (mandatory)</li>
                                                        <li>Name and contact number (optional)</li>
                                                        <li>You are responsible for your login credentials and all activity under your account.</li>
                                                    </ul>

                                                    <strong>4. Services Provided</strong>
                                                    <ul>
                                                        <li>Fyjix provides online text-to-speech generation in multiple languages and accents.</li>
                                                        <li>A demo feature allows limited free use before purchasing character packs.</li>
                                                    </ul>

                                                    <strong>5. Payments, Pricing, and Refunds</strong>
                                                    <ul>
                                                        <li>Payments are processed through the TJSB Bank payment gateway.</li>
                                                        <li>All purchases are non-refundable.</li>
                                                        <li>Characters never expire.</li>
                                                        <li>Refunds may be issued only if a verified system error prevented service delivery.</li>
                                                        <li>Price changes may occur and continued use implies acceptance.</li>
                                                    </ul>

                                                    <strong>6. Licensing and Ownership of Generated Audio</strong>
                                                    <ul>
                                                        <li>You retain full commercial ownership of all Generated Audio.</li>
                                                        <li>We do not claim rights over your audio.</li>
                                                        <li>You are responsible for ensuring your text and use of the audio comply with applicable laws.</li>
                                                    </ul>

                                                    <strong>7. User Content and Data Handling</strong>
                                                    <ul>
                                                        <li>
                                                            <strong>7.1 Text Input, Logs, and Stored Data</strong>
                                                            <ul>
                                                                <li>To operate the Service, maintain security, and prevent abuse, we store the following:</li>
                                                                <li>IP addresses</li>
                                                                <li>User actions performed on the platform</li>
                                                                <li>Text input submitted for generating audio</li>
                                                                <li>Character usage logs</li>
                                                                <li>Character count history</li>
                                                                <li>Email (mandatory)</li>
                                                                <li>Name and contact number (optional)</li>
                                                            </ul>
                                                        </li>

                                                        <li>
                                                            <strong>7.2 Audio Storage</strong>
                                                            <ul>
                                                                <li>We do not store any Generated Audio.</li>
                                                                <li>Audio is processed and delivered but not saved, retained, or archived by Fyjix.</li>
                                                            </ul>
                                                        </li>

                                                        <li>
                                                            <strong>7.3 Payment Information</strong>
                                                            <ul>
                                                                <li>We do not collect or store payment card details.</li>
                                                            </ul>
                                                        </li>

                                                        <li>
                                                            <strong>7.4 Privacy</strong>
                                                            <ul>
                                                                <li>Data is handled according to our Privacy Policy.</li>
                                                            </ul>
                                                        </li>
                                                    </ul>

                                                    <strong>8. Acceptable Use Policy</strong>
                                                    <ul>
                                                        <li>You must not use the Service to:</li>
                                                        <li>Create deepfake voices or misleading impersonations.</li>
                                                        <li>Produce or distribute political content.</li>
                                                        <li>Generate hate speech, harassment, threats, or abusive material.</li>
                                                        <li>Conduct illegal, fraudulent, or harmful activities.</li>
                                                        <li>Violate copyright or third-party intellectual property rights.</li>
                                                        <li>Reverse-engineer or misuse the Service.</li>
                                                        <li>Violations may lead to account suspension or termination without refund.</li>
                                                    </ul>

                                                    <strong>9. Intellectual Property</strong>
                                                    <ul>
                                                        <li>All software, system design, branding, and platform features belong to Fyjix IT Solutions.</li>
                                                        <li>Users may not exploit or reproduce the platform’s underlying intellectual property.</li>
                                                        <li>Generated Audio remains your property.</li>
                                                    </ul>

                                                    <strong>10. Service Availability & Changes</strong>
                                                    <ul>
                                                        <li>We aim for high uptime but do not guarantee uninterrupted access.</li>
                                                        <li>The Service may be modified or discontinued at any time.</li>
                                                    </ul>

                                                    <strong>11. Disclaimer of Warranties</strong>
                                                    <ul>
                                                        <li>The Service is provided "as-is" and "as-available".</li>
                                                        <li>We do not guarantee error-free operation or specific performance outcomes.</li>
                                                    </ul>

                                                    <strong>12. Limitation of Liability</strong>
                                                    <ul>
                                                        <li>To the fullest extent permitted by law:</li>
                                                        <li>Fyjix is not liable for indirect or consequential damages.</li>
                                                        <li>Total liability is limited to the amount paid in the previous 30 days.</li>
                                                        <li>No liability applies for misuse or violations of these Terms.</li>
                                                    </ul>

                                                    <strong>13. Suspension or Termination</strong>
                                                    <ul>
                                                        <li>Accounts may be suspended or terminated for violations of the Terms.</li>
                                                        <li>Remaining characters may be forfeited without refund.</li>
                                                    </ul>

                                                    <strong>14. Third-Party Links</strong>
                                                    <ul>
                                                        <li>We are not responsible for third-party sites linked through the platform.</li>
                                                    </ul>

                                                    <strong>15. Governing Law</strong>
                                                    <ul>
                                                        <li>These Terms are governed by the laws of India.</li>
                                                        <li>Any disputes will be resolved exclusively in Indian courts.</li>
                                                    </ul>

                                                    <strong>16. Contact Information</strong>
                                                    <ul>
                                                        <li>For support, billing inquiries, or legal concerns, contact:</li>
                                                        <li>Email: info@fyjix.com</li>
                                                        <li>Company: Fyjix IT Solutions</li>
                                                        <li>Country: India</li>
                                                    </ul>
                                            </ul>
                                        </li>
                                    </ul>
                                </p>
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default NewUser