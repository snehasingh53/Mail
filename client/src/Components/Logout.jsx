import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Snackbar, Alert } from "@mui/material";

function Logout({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const handleLogout = () => {
        axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setIsLoggedIn(false);
                    // Navigate to the login page or a confirmation page
                    navigate("/login"); // Change this to the desired route
                }
            })
            .catch(error => {
                console.error("Error logging out:", error);
                setSnackbarMessage("Error logging out. Please try again.");
                setOpenSnackbar(true);
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const buttonStyle = {
        marginRight: '20px',
        fontSize: '1.2rem',
        fontWeight: '700',
        padding: '0.3rem 1.4rem'
    };

    return (
        <>
            <Button variant="contained" color="error" style={buttonStyle} onClick={handleLogout}>
                Logout
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Logout;