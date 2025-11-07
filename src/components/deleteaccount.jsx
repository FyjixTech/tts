import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { getEnvironment } from "../utils.js";
import { useNavigate } from 'react-router';


const DeleteAccount = () => {
    const navigate = useNavigate()
    const handleDeleteClick = async () => {
        const token = sessionStorage.getItem("accesstoken");
        const url = getEnvironment();
        const api = "delete-user";
        const link = url + api;
        const response = await fetch(link, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if(response.ok){
            if(data.msg){
                sessionStorage.clear()
                navigate('/')
            }
        }
    }
    return (
        <>

            <div className="container mt-4">
                <Typography variant="h6" component="h2">
                    Delete Account
                </Typography>
                <div className="container mt-3">
                    <div className="row mb-3">
                        <Typography variant="body1" sx={{ mb: 1, color: "text.secondary" }}>
                            Once you delete your account, your profile, data, and activity history
                            will be permanently removed from our systems after a <b>30-day grace
                                period</b>. During these 30 days:
                        </Typography>

                        <ul style={{ marginLeft: "20px", marginBottom: "20px", color: "text.secondary" }}>
                            <li style={{ color: "rgb(0 0 0 / 65%)" }}>Your account will be deactivated and inaccessible to others.</li>
                            <li style={{ color: "rgb(0 0 0 / 65%)" }}>You can log in to restore your account at any time before the 30 days expire.</li>
                            <li style={{ color: "rgb(0 0 0 / 65%)" }}>After 30 days, all data will be <b>irreversibly deleted</b>.</li>
                        </ul>

                        <Typography variant="body1" sx={{ mb: 1, color: "text.secondary" }}>
                            Please note:
                        </Typography>
                        <ul style={{ marginLeft: "20px", marginBottom: "10px", color: "text.secondary" }}>
                            <li style={{ color: "rgb(0 0 0 / 65%)" }}>
                                Any active subscriptions will be cancelled immediately, and{" "}
                                <strong>no refunds</strong> will be issued for unused credits,
                                subscriptions, or payments already made.
                            </li>
                            <li style={{ color: "rgb(0 0 0 / 65%)" }}>
                                Any data stored for legal or compliance purposes (e.g., invoices)
                                may be retained as required by law, but will no longer be linked to
                                your account.
                            </li>
                        </ul>
                    </div>
                    <div className="row mt-2">
                        <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
                            This action cannot be undone. Are you sure you want to proceed?
                        </Typography>
                    </div>

                    <div className="row">
                        <div className="col">
                            <button onClick={handleDeleteClick} className='btn btn-danger'><DeleteIcon /> Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DeleteAccount