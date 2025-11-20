import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Alert from '@mui/material/Alert';
import { getEnvironment } from '../utils';

const Contact = () => {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccessMessage] = useState("")
  const [error, setErrorMessage] = useState("")
  const urla = getEnvironment();
  const api = "send-message";
  const link = urla + api;
  const emailR = /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleSendMessageClick = async () => {
    try {
      if (name.trim().trim() === "") {
        setSuccessMessage("")
        setErrorMessage("Please enter your name")
        return;
      }

      if (email.trim().trim() === "") {
        setErrorMessage("Please enter your email")
        return;
      }

      if (!emailR.test(email)) {
        setErrorMessage("Please enter valid email")
        return;
      }
      if (message.trim().trim().length === 0) {
        setErrorMessage("Please enter your message")
        return;
      }

      setLoading(true)
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            "name": name,
            "email": email,
            "message": message
          }
        )
      });

      if (response.ok) {
        const data = await response.json();
        setErrorMessage("")
        setSuccessMessage(data.data)
        setLoading(false)
      }
      else {
        setLoading(false)
        const data = await response.json();
        setSuccessMessage("")
        setErrorMessage(data.data)
      }
      setLoading(false)
    }
    catch (error) {
      setLoading(false)
      setSuccessMessage("")
      setErrorMessage("We Apologize for the inconvenience." + error.message)
    }
  }

  return (
    <div>
      <div className="container">
      {loading && (
        <div className="loader"></div>
      )}
        <div className="card p-5 shadow-lg">
          <div className="row">
            <center><h3>Contact Us</h3></center>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="row mt-3">
                <div className="col-2" style={{ display: "flex", alignItems: 'center' }}>Name:</div>
                <div className="col-10">
                  <TextField
                    placeholder='Name'
                    label="Name"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    size='small'
                    id='Name'
                  ></TextField>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-2" style={{ display: "flex", alignItems: 'center' }}>Email:</div>
                <div className="col-10">
                  <TextField
                    placeholder='Email'
                    label="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    size='small'
                    fullWidth
                    id='Email'
                  ></TextField>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-2">Message:</div>
                <div className="col-10">
                  <TextField
                    placeholder='Message'
                    label="Message"
                    size='small'
                    onChange={(e) => setMessage(e.target.value)}
                    id='Message'
                    fullWidth
                    multiline
                    rows={3}>

                  </TextField>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <span className='btn btn-primary' onClick={handleSendMessageClick}>Send</span>
                </div>
              </div>
              {success ? <>
                <div className="row mt-3">
                  <Alert severity="success">{success}</Alert>
                </div>
              </> : <></>}

              {error ? <>
                <div className="row mt-3">
                  <Alert severity="error">{error}</Alert>
                </div>
              </> : <></>}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact