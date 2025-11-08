import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { getEnvironment } from "../utils.js";
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


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


const MyAccount = () => {
    const [accountDetails, setAccountDetails] = useState([])
    const [usedChars, setUsedChars] = useState("")
    const [leftChars, setLeftChars] = useState("")
    const [email, setEmail] = useState("")
    const [plan, setPlan] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchAccountDetails()
    }, [])

    const handleUpdateName = async () => {
        setLoading(true)
        const url = getEnvironment();
        const api = "tts-update-profile";
        const link = url + api;
        const token = sessionStorage.getItem("accesstoken");

        const response = await fetch(link, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "firstName": firstName, "lastName": lastName, "contactNo": contactNumber })
        });

        const data = await response.json()

        if (response.ok) {
            setMessage(data.data)
            fetchAccountDetails()
        }
        setLoading(false)


    }

    const fetchAccountDetails = async () => {
        setLoading(true);

        const url = getEnvironment();
        const api = "tts-get-account-details";
        const link = url + api;
        const token = sessionStorage.getItem("accesstoken");

        const response = await fetch(link, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const data = await response.json()

        if (response.ok) {
            console.log(data.data)
            setAccountDetails(data.data)
            setFirstName(data.data.firstName)
            setLastName(data.data.lastName)
            setContactNumber(data.data.phoneNumber)
            setEmail(data.data.userEmail)
        }
        setLoading(false)
    }

    const handleChangePasswordNavigation = () => {
        navigate("/change-password")
    }

    const handleDeleteAccountNavigation = () => {
        navigate("/delete-account")
    }
    return (
        <>
            {loading && (
                <div className="loader"></div>
            )}
            <Typography sx={{ padding: "10px" }} variant="h6" component="h2">
                My Account <EditIcon
                    sx={{
                        fontSize: 23,
                        marginLeft: "20px",
                        color: "green"
                    }}
                    onClick={handleOpen}
                />
            </Typography>
            <div className="container mb-3">
                <div className="row">
                    <div className="col-sm-9 col-md-5 col-lg-5">
                        <b>Name : </b> {accountDetails.firstName} {accountDetails.lastName}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Email : </b> {accountDetails.userEmail} </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Contact No. : </b> {accountDetails.phoneNumber} </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Account Created At : </b> {new Date(accountDetails.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    })} </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Account Updated At : </b> {new Date(accountDetails.updatedAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    })} </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Used Characters : </b> {accountDetails.usedChars} </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Left Characters : </b> {accountDetails.chars} </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Generated Audio : </b> {accountDetails.generatedAudio} </div>
                </div>
            </div>
            <Divider />
            <List>
                <ListItem disablePadding onClick={handleChangePasswordNavigation}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LockOpenIcon />
                        </ListItemIcon>
                        <ListItemText> Change Password </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={handleDeleteAccountNavigation}>
                    <ListItemButton>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText> Delete Account </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>

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
                            Edit Your Name & Number
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6">
                                    <TextField
                                        onChange={(e) => setFirstName(e.target.value)}
                                        size='small'
                                        label='First Name'
                                        fullWidth
                                        value={firstName}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6">
                                    <TextField
                                        onChange={(e) => setLastName(e.target.value)}
                                        size='small'
                                        label='Last Name'
                                        fullWidth
                                        value={lastName}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-sm-12 col-md-6 col-lg-6">
                                    <TextField
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        size='small'
                                        label='Contact Number'
                                        fullWidth
                                        value={contactNumber}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6">
                                    <TextField
                                        onChange={(e) => setEmail(e.target.value)}
                                        size='small'
                                        label='E-Mail'
                                        fullWidth
                                        value={email}
                                        disabled
                                    />
                                </div>
                            </div>

                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <div className="row">
                                <div className="col-1">
                                    <button onClick={handleUpdateName} className='btn' style={{ background: "#00565d", color: "#fcd941" }}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <div className="row">
                                {message && (
                                    <>
                                        <span className=''>{message}</span>
                                    </>
                                )}
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default MyAccount