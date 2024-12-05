import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import axios from "axios";

const EmailList = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Fetch data from the backend
        axios.get('/fetch-emails')
            .then(response => {
                console.log(response.data); // Log the response data
                // Check if response is an array or an object with emails
                if (Array.isArray(response.data)) {
                    setEmails(response.data);
                } else if (response.data.emails) {
                    setEmails(response.data.emails);
                } else {
                    setEmails([]); // Default to empty array if no emails found
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the emails!", error);
                setError("Failed to fetch emails."); // Set error message
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>; // Display error message
    }

    return (
        <List>
            {Array.isArray(emails) && emails.length > 0 ? (
                emails.map((email, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={email.sender}
                            secondary={email.subject}
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="body2" color="textSecondary">
                                {email.time}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No emails found." />
                </ListItem>
            )}
        </List>
    );
};

export default EmailList;