import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import { getEnvironment } from "../utils.js"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { UAParser } from 'ua-parser-js';

const style = {
  position: 'absolute',
  overflowY: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxHeight: '75vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Check for existing token on component mount
  useEffect(() => {
    const existingToken = sessionStorage.getItem("accesstoken");
    // Fixed the logic - use && instead of ||
    if (existingToken && existingToken !== "" && existingToken !== "null" && existingToken !== "undefined") {
      console.log("User already logged in, redirecting...");
      navigate("/app/home");
    }
  }, [navigate]);
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
  const handleLoginClick = async () => {
    // Clear previous errors
    setError("");

    // Validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const url = getEnvironment();
      const api = "tts-user-login";
      const link = url + api;
      const payload = {
        userEmail: email.trim(),
        password: password,
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
        if (data.msg === "success") {
          sessionStorage.setItem("accesstoken", data.data);
          sessionStorage.setItem("userRole", data.userRole);
          navigate("/app/home");
        } else {
          setError(data.data || "Login failed");
        }
      } else {
        setError(data.message || data.data || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLoginClick();
    }
  };

  const navigateToNewUser = () => {
    navigate("/app/new-user")
  }


  const handleResetPassword = async () => {
    try {
      setLoading(true);

      let res = true;
      if (email.trim().trim() === "") {
        res = false;
        setMessage("Please enter your registered email id")
        setLoading(false);
        return;
      }

      if (res) {
        const url = getEnvironment();
        const api = "tts-forgot-password";
        const link = url + api;
        const payload = {
          userEmail: email.trim(),
        };
        const response = await fetch(link,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
          }
        )

        const data = await response.json()
        if (response.ok) {
          setMessage(data.data)
        }
      }
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      setMessage("Some Error Occurred.")
    }
  }

  return (
    <>
      {loading && <div className="loader"></div>}

      <div className='container center'>
        <div className="login-card">
          <div className="row">
            <div className="card">
              <div className="row">
                <div className="col">
                  <div className="container">
                    <div className="row justify-content-center mb-2">
                      {/* <div className="col-auto">
                        <img src={logo} className='logo' alt="Fyjix Logo" />
                      </div> */}
                    </div>
                    <div className="row">
                      <div className="col text-center">
                        <h3>Login</h3>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <TextField
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyPress={handleKeyPress}
                          size='small'
                          label='Email'
                          type='email'
                          fullWidth
                          value={email}
                          disabled={loading}
                          error={error.includes("email")}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col">
                        <TextField
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyPress={handleKeyPress}
                          size='small'
                          label='Password'
                          type='password'
                          fullWidth
                          value={password}
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col">
                        <span onClick={handleOpen} className="text-decoration-none">
                          Forgot Password?
                        </span>
                      </div>
                    </div>
                    <div className="row mt-4 mb-1">
                      <div className="col">
                        <button
                          className='btn btn-success w-100'
                          onClick={handleLoginClick}
                        >
                          {loading ? "Logging in..." : "Login"}
                        </button>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <button
                          className='btn btn-success w-100'
                          onClick={navigateToNewUser}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                    {error && (
                      <div className="row mb-3">
                        <div className="col">
                          <div className="alert alert-danger text-center py-2">
                            {error}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="col hide login-cover">
                </div> */}
              </div>
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
            <span id="transition-modal-title"  className='mt-2'>
              Your Password will be reset
            </span>
            <span id="transition-modal-description" className='mt-2'>
              {email ? (
                <>
                  Are you sure you want to reset the password for {email}?
                </>
              ) : (
                <>
                  <div className="row mb-2"> Please enter your email</div>
                  <div className="row">
                    <div className="col-12">
                      <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        size='small'
                        label='Email'
                        type='email'
                        fullWidth
                        value={email}
                        disabled={loading}
                        error={error.includes("email")}
                      />
                    </div>
                  </div>
                </>
              )}

            </span>
            <span id="transition-modal-description" >
              <div className="row className='mt-5'">
                <div className="col-1">
                  <button onClick={handleResetPassword} className='btn mt-4 btn-danger'>
                    Reset
                  </button>
                </div>
              </div>
            </span>
            <span id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="row mt-4">
                {message && (
                  <>
                    <span className=''>{message}</span>
                  </>
                )}
              </div>
            </span>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
export default Login