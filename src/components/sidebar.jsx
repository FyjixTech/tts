import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // My Account
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Manage Payments
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import HomeIcon from '@mui/icons-material/Home';
import ApprovalIcon from '@mui/icons-material/Approval';
import SellIcon from '@mui/icons-material/Sell';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';

function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);
    const [userRole, setUserRole] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(()=>{
        const ur = sessionStorage.getItem("userRole")
        setUserRole(ur)

    },[userRole])

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleMyAccountNavigation = () => {
        navigate("/my-account")
    }

    const handleMyPaymentsNavigation = () => {
        navigate("/my-payments")
    }

    const handlePaymentPlansNavigation = () => {
        navigate("/payment-plans")
    }

    const handleInstructionNavigation = () => {
        navigate("/how-to-use")
    }

    const handleHomeNavigation = () => {
        navigate("/home")
    }

    const handleApprovePayments = () => {
        navigate("/approve-payments")
    }
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/")
      }
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <div className="container">
                <Typography sx={{ padding: "10px", display: 'flex', justifySelf: "center" }} variant="h6" component="h2">
                    Menu
                </Typography>
            </div>

            <List>
            <ListItem disablePadding onClick={handleHomeNavigation}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText>Home </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={handleMyAccountNavigation}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText> My Account </ListItemText>
                    </ListItemButton>
                </ListItem>
                {userRole === "owner" ? <>
                    <ListItem disablePadding onClick={handleApprovePayments}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ApprovalIcon />
                        </ListItemIcon>
                        <ListItemText> Approve Payments </ListItemText>
                    </ListItemButton>
                </ListItem>
                </>:<></>}
                <ListItem disablePadding onClick={handleInstructionNavigation}>
                    <ListItemButton>
                        <ListItemIcon>
                            <InfoOutlineIcon />
                        </ListItemIcon>
                        <ListItemText> Instructions </ListItemText>
                    </ListItemButton>
                </ListItem>
                
                <ListItem disablePadding onClick={handleMyPaymentsNavigation}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText> My Payments </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={handlePaymentPlansNavigation}>
                    <ListItemButton>
                        <ListItemIcon>
                            <SellIcon />
                        </ListItemIcon>
                        <ListItemText> Payment Plans</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={handleLogout}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PowerSettingsNewRoundedIcon />
                        </ListItemIcon>
                        <ListItemText> Logout</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>

            {open ? (
                <>
                    <Button onClick={toggleDrawer(false)}>
                        <CloseIcon
                            sx={{
                                position: 'fixed',
                                top: 12,
                                left: 15,
                                background:"#00565d",
                                color:"#fcd941",
                                fontSize: 35,
                                borderRadius:"10000px",
                                padding:"5px",
                                zIndex: 2000 
                            }} />
                    </Button>
                </>
            ) : (
                <>
                    <Button onClick={toggleDrawer(true)}>
                        <MenuIcon
                            sx={{
                                background:"#00565d",
                                color:"#fcd941",
                                borderRadius:"10000px",
                                padding:"5px",
                                position: 'fixed',
                                fontSize: 40,
                                top: 10,
                                left: 10,
                                zIndex: 2000 // keep it above other elements
                            }} />
                    </Button>
                </>
            )}
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}


export default TemporaryDrawer;