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
                logData : getClientInfo()
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
                    nagivate("/home")
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
                                <span onClick={handleOpen}>Accept Terms, Conditions & Privacy Policy</span>
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
                                    <ol>
                                        <li><b>Agreement to Terms : </b> By using Fyjix Text-to-Speech, you agree to these Terms of Service (“Terms”) and the Acceptable Use Policy below. If you do not agree, do not use the Service.</li>
                                        <li><b>Who can use the Service : </b> You must be of legal age in your jurisdiction to form a binding contract (or have a parent/guardian’s consent). You represent that you are at least 18, or if your local law permits, the minimum age agreed in your region. You must not let minors use the Service to produce content involving sexual activity or other harmful use.</li>
                                        <li><b>What the Service does : </b> Fyjix provides on-demand audio generation from text. Generated audio is returned as a downloadable file; by default Fyjix does not store generated audio. We perform ephemeral processing for generation and automated moderation as described below. Only Flagged texts are stored with us.</li>
                                        <li><b>User representations and warranties : </b> By using the Service you represent and warrant that:
                                            <ul>
                                                <li>you will not use the Service to produce content that violates laws, third-party rights, or these Terms, and</li>
                                                <li>all information you provide is accurate.</li>
                                            </ul>
                                        </li>
                                        <li><b>Acceptable Use & Prohibited Conduct, i.e., zero-tolerance list (you will be enforced) : </b>
                                            You must not use the Service to produce content that:
                                            <ul>
                                                <li>facilitates or threatens violence, terrorism, or criminal acts;</li>
                                                <li>harasses, bullies, or targets a protected class or individual (hate speech, identity-based attacks);</li>
                                                <li>contains sexual content involving minors, exploitation, or trafficking;</li>
                                                <li>enables fraud, phishing, or instructs the planning of wrongdoing;</li>
                                                <li>impersonates a real person without their explicit consent (voice cloning without permission);</li>
                                                <li>creates or distributes deepfakes meant to deceive about elections, public safety, or legal proceedings;</li>
                                                <li>violates copyright, IP, or confidentiality;</li>
                                                <li>violates any applicable law.</li>
                                            </ul>
                                        </li>
                                        <li><b>Moderation and enforcement :</b>
                                            <ul>
                                                <li><i>Automated filters :</i> We run automated moderation (client-side and/or server-side). Filters are tuned to block common toxic, illegal, or otherwise disallowed content. Filters are not perfect.</li>
                                                <li><i>Manual review :</i> We may review flagged or reported content. If we reasonably suspect misuse, we may suspend accounts, revoke access, delete data and cooperate with law enforcement.</li>
                                                <li><i>Reporting :</i> To report content, contact [info@fyjix.com]. Provide timestamp, sample text. We aim to respond within 24 hours to abuse reports.</li>
                                                <li><i>Sanctions :</i> Warnings, temporary suspension, permanent ban, content takedown, account termination, or legal referral.</li>
                                            </ul>
                                        </li>
                                        <li><b>Liability, disclaimers, and indemnity :</b>
                                            <ul>
                                                <li><i>No warranties :</i> The Service is provided “AS IS” and “AS AVAILABLE.” We disclaim all implied warranties to the fullest extent permitted by law. We don’t promise that output is accurate, safe, or fit for any particular purpose.</li>
                                                <li><i>Limitation of liability :</i> To the maximum extent permitted by law, Fyjix and its owners, officers, and employees are not liable for any indirect, incidental, consequential, punitive, or special damages arising from your use of the Service. Our maximum aggregate liability does not exceed the fees paid by you to Fyjix in the prior 12 months.</li>
                                                <li><i>Indemnity :</i> You agree to indemnify, defend, and hold harmless Fyjix from any claim, loss, damage, liability, cost, or expense (including reasonable attorneys’ fees) arising out of:
                                                    <ul>
                                                        <li>your use of the Service</li>
                                                        <li>your breach of these Terms</li>
                                                        <li>user-generated content you supply, or </li>
                                                        <li>your violation of any law or third-party rights.</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><b>User content & intellectual property : </b>
                                            <ul>
                                                <li><i>Ownership : </i>You retain ownership of your input text and the audio you generate.</li>
                                                <li><i>License to operate : </i>You grant Fyjix a non-exclusive, worldwide, royalty-free license to the minimum extent needed to provide the Service (e.g., transient processing, caching for abuse-prevention, debugging), subject to our Privacy Policy and the data-retention terms below.</li>
                                                <li><i>Copyright takedown : </i>If you believe your copyrighted work has been used inappropriately, follow the DMCA procedure: send a takedown notice to [info@fyjix.com]. Include: identification of the copyrighted work, identification of the allegedly infringing material, your contact info, a good-faith statement, and a physical or electronic signature.</li>
                                            </ul>
                                        </li>
                                        <li><b>Payments and refunds : </b>No refunds shall be granted under any conditions. Unprocessed payments or extra payments shall be returned from bank.</li>
                                        <li><b>Changes, suspension, and termination : </b>We can modify features or these Terms at any time; we’ll post changes and, where appropriate, notify you. We may suspend or terminate access for policy violations or legal reasons. On termination, your access ends and we may delete data per the retention schedule.</li>
                                        <li><b>Governing law and dispute resolution : </b>These Terms are governed by the laws of India, Maharashtra, Mumbai. Disputes must be resolved in local courts or by arbitration in Mumbai, except where prohibited.</li>
                                        <li><b>Miscellaneous : </b>
                                            <ul>
                                                <li><i>Severability : </i> If a provision is invalid, the remainder remains enforceable.</li>
                                                <li><i>Entire agreement : </i> These Terms and Privacy Policy are the entire agreement between you and Fyjix.</li>
                                                <li><i>Contact : </i>  For policy questions, contact [info@fyjix.com].</li>
                                            </ul>
                                        </li>
                                        <li>
                                            We log limited technical and usage information to protect our service from abuse, fraud, and illegal activity. This may include your IP address, browser/device details, and transaction records. In cases of suspected misuse, we may link this data to your account, retain it for investigation, and share it with law enforcement when required.
                                        </li>
                                    </ol>
                                </p>
                                <p>
                                    <b>ACCEPTABLE USE</b>
                                </p>
                                <ul>
                                    <li>Allowed (examples): harmless narration, public-domain voice styles, educational use, accessibility conversions, non-consensual content that is clearly fictional and not targeting a real person. Eg: "What a beautiful picture. Keep it up!","I think you did a great job on this!"</li>
                                    <li>Disallowed (examples): Identity Attack, Obscene/Sexual, Insult, Threat, Hate Speech, Toxic. Eg: "I hate people like you.","You're disgusting.","I'll find you and make you pay for this.","You're a total idiot.","How can you be so dumb?"," Send me nudes right now.","People of your kind shouldn't be allowed here."</li>
                                </ul>
                                <p>
                                    <b>PRIVACY POLICY</b>
                                </p>
                                We value privacy. Fyjix does not permanently store your generated audio or raw prompts by default. We may perform ephemeral processing to generate the audio and may retain minimal, anonymized metadata for abuse prevention and legal compliance. We won’t sell your personal data.
                                <ul>
                                    <li><b>Controller and contact : </b> Fyjix is the data controller. Contact: [info@fyjix.com]. For legal requests or data subject requests, email that address.</li>
                                    <li><b>What we collect and why : </b>
                                        <ul>
                                            <li><i>Input content (text you submit) : </i>
                                                <ul>
                                                    <li>Purpose: On-the-fly TTS generation and automated moderation.</li>
                                                    <li>Storage: By default, we do not permanently store full prompts or audio. Prompts are processed in-memory or transiently.</li>
                                                </ul>
                                            </li>
                                            <li>Generated audio :
                                                <ul>
                                                    <li>Purpose: Delivered to you as a downloadable file.</li>
                                                    <li> Storage: Not retained by default.</li>
                                                </ul>
                                            </li>
                                            <li>Minimal logs / metadata (abuse prevention) :
                                                <ul>
                                                    <li>Examples: timestamp, API key or account id, request size, hash of generated file, moderation-flag status.</li>
                                                    <li>Purpose: Abuse detection, rate limiting, fraud prevention, compliance with law enforcement requests.</li>
                                                    <li>Retention: [default 30 days]</li>
                                                </ul>
                                            </li>
                                            <li>Billing data (abuse prevention) :
                                                <ul>
                                                    <li>Stored by payment processor; we do not store raw card numbers. We may store billing email and transaction metadata.</li>
                                                </ul>
                                            </li>
                                            <li>Optional account data :
                                                <ul>
                                                    <li>If you create an account, we store username, email, and hashed password. We do not store SSNs, card numbers, or sensitive PII except as required for billing/identity verification.</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>How we use automated moderation & logs : </b>
                                        <ul>
                                            <li>We run automated content moderation to block illegal/toxic content. Moderation may be client-side or server-side. Moderation signals and flagged items may be stored temporarily to prevent repeat abuse.</li>
                                            <li>False negatives : Filters are not perfect. We log reports and may manually review flagged content.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Sharing and disclosures : </b>
                                        <ul>
                                            <li><i>Service providers :</i>  We may share limited data with subprocessors (cloud hosting, payment processors) under contracts.</li>
                                            <li><i>Legal :</i>  We will disclose data to comply with law enforcement or valid legal process.</li>
                                            <li><i>No sale :</i>  We do not sell personal data.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Your rights : </b> Depending on jurisdiction, you may have rights to: access, correct, delete, restrict processing, portability, or object. To exercise rights, email [info@fyjix.com]. We will verify identity and respond within applicable legal windows.
                                    </li>
                                    <li><b>Data retention & deletion : </b>
                                        <ul>
                                            <li><i>Default : </i> ephemeral processing; minimal logs for [7 days].</li>
                                            <li><i>Account deletion : </i> Deleting your account triggers deletion of account data and user-stored files per our retention schedule; backups may persist an additional period per disaster recovery needs. Contact us for immediate erasure requests; we will comply to the extent allowed by law.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Security : </b>
                                        <ul>
                                            <li>We use industry-standard security measures: TLS in transit, encryption at rest where applicable, hashed passwords, principle-of-least-privilege access.</li>
                                            <li>No system is perfect. Report suspected breaches to [info@fyjix.com] immediately.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Children : </b> We do not target or knowingly collect information from children under 13 (or local minimum age). If you are a parent and discover a child’s data, contact us to remove it.
                                    </li>
                                    <li><b>International data transfers : </b> We may transfer data to service providers outside your country. We will ensure protections via standard contractual clauses or other lawful mechanisms.</li>
                                    <li>
                                        <b>Changes to this Privacy Policy :</b> We may update this policy; significant changes will be posted on our site and, where appropriate, notified to account holders.
                                    </li>
                                    <li><b>Data controller jurisdiction and contact : </b> Fyjix Tech IT Solutions, Navi Mumbai, info@fyjix.com.</li>
                                    <li>
                                        <b>Emergency / law enforcement exceptions : </b> We will comply with valid legal process and will disclose any data we have (even if minimal) to law enforcement when required. If we possess zero useful data because the Service was configured to never store anything, we will say so and produce what we can.
                                    </li>
                                    <li>
                                        <b>Self-harm / threats and mandatory escalation :</b> If content indicates imminent threat to life or public safety, Fyjix reserves the right to disclose information to authorities.
                                    </li>
                                    <li>
                                        <b>False-positive/negative remediation policy :</b>
                                        <ul>
                                            <li><i>Appeals process : </i> If a user’s request is blocked, they may file an appeal via info@fyjix.com. Appeals will be reviewed within 2 business days.</li>
                                            <li><i>Human review : </i> We will provide human review where feasible.</li>
                                        </ul>
                                    </li>

                                    <li><b>Security & Misuse Prevention Clause : </b>
                                        <p>
                                            For security, fraud prevention, and compliance with applicable laws, we automatically collect and temporarily store certain technical identifiers when you interact with the Service. This includes your IP address, device and browser information, usage logs, and API request metadata.
                                        </p><p>
                                            This information is retained for no longer than 30 days unless an investigation is in progress. In cases of suspected misuse, we may retain relevant records for a longer period and share them with law enforcement or payment processors as required.
                                        </p>
                                        <p>
                                            This data is not used for marketing purposes and is never sold to third parties.
                                        </p>
                                        Data we collect may include: IP address, Browser type & version, Operating system, Device type (mobile/ desktop/ tablet), Screen resolution, Language & timezone settings, Referrer URL, API request details (timestamp, request size, voice type used).
                                    </li>
                                </ul>
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default NewUser