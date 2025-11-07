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
    const [promptDetails, setPromptDetails] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchAccountDetails()
    }, [])

    const handleUpdateName =async () =>{
        setLoading(true)
        const url = getEnvironment();
        const api = "update-user";
        const link = url + api;
        const token = sessionStorage.getItem("accesstoken");

        const response = await fetch(link, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "firstName": firstName, "lastName": lastName })
          });

          const data = await response.json()

          if(response.ok){
                setMessage(data.data)
                fetchAccountDetails()
          }
          setLoading(false)


    }

    const fetchAccountDetails = async () => {
        setLoading(true);

        const url = getEnvironment();
        const api = "get-account-details";
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
            console.log(data)
            setAccountDetails(data.userData[0])
            setFirstName(data.userData[0].firstName)
            setLastName(data.userData[0].lastName)
            setPromptDetails(data.promptData)
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
                <PersonIcon /> My Account
            </Typography>
            <div className="container mb-3">
                <div className="row">
                    <div className="col-sm-9 col-md-3 col-lg-3"><b>Name : </b> {accountDetails.firstName} {accountDetails.lastName}

                    </div>
                    <div className="col-sm-1 col-md-3 col-lg-3">
                        <EditIcon
                            sx={{
                                fontSize: 20
                            }}
                            onClick={handleOpen}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Account Created At : </b> {accountDetails.createdAt} </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Account Updated At : </b> {accountDetails.updatedAt} </div>
                </div>
                <div className="row mt-3">
                    <div className="col"><b>Total Prompts Generated Till Now : </b> {promptDetails} </div>
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
                            Edit Your Name
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

                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <div className="row">
                                <div className="col-1">
                                    <button onClick={handleUpdateName} className='btn' style={{background:"#00565d",color:"#fcd941"}}>
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