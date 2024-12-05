// LogoutConfirmation.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const LogoutConfirmation = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">You have successfully logged out</Typography>
            <Typography variant="body1">Thank you for using our application!</Typography>
        </Box>
    );
};

export default LogoutConfirmation;