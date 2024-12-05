import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Link, Button, Paper, TextField, Typography, Snackbar, Alert } from "@mui/material";

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setSnackbarMessage("Email and password are required.");
            setSnackbarOpen(true);
            return;
        }

        axios.post("http://localhost:3001/login", { email, password }, { withCredentials: true })
            .then(result => {
                if (result.data === "Success") { // Adjust this based on your backend response
                    // Fetch the user data
                    axios.get('http://localhost:3001/user', { withCredentials: true })
                        .then(response => {
                            if (response.data.user) {
                                setIsLoggedIn(true);
                                setEmail(""); // Reset email field
                                setPassword(""); // Reset password field
                                navigate("/landing", { state: { user: response.data.user } }); // Redirect to Landing page
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            setSnackbarMessage("Failed to fetch user data.");
                            setSnackbarOpen(true);
                        });
                } else {
                    setSnackbarMessage("Login failed: " + result.data); // Display the error message from the backend
                    setSnackbarOpen(true);
                }
            })
            .catch(err => {
                console.error(err);
                setSnackbarMessage("An error occurred: " + (err.response ? err.response.data : "Network Error"));
                setSnackbarOpen(true);
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const paperStyle = { padding: "2rem", margin: "100px auto", borderRadius: "1rem", boxShadow: "10px 10px 10px" };
    const heading = { fontSize: "2.5rem", fontWeight: "600" };
    const row = { display: "flex", marginTop: "2rem" };
    const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem" };
    const label = { fontWeight: "700" };

    return (
        <div>
            <Grid align="center" className="wrapper">
                <Paper style={paperStyle} sx={{ width: { xs: '80vw', sm: '50vw', md: '40vw', lg: '30vw', xl: '20vw' }, height: { lg: '50vh' } }}>
                    <Typography component="h1" variant="h5" style={heading}>Login</Typography>
                    <form onSubmit={handleLogin}>
                        <span style={row}>
                            <TextField
                                sx={{ label: { fontWeight: '700', fontSize: "1.3rem" } }}
                                style={label}
                                label="Email"
                                fullWidth
                                variant="outlined"
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={email} // Controlled component
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Email"
                            />
                        </span>
                        <span style={row}>
                            <TextField
                                sx={{ label: { fontWeight: '700', fontSize: "1.3rem" } }}
                                label="Password"
                                fullWidth
                                variant="outlined"
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={password} // Controlled component
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Password"
                            />
                        </span>
                        <Button style={btnStyle} variant="contained" type="submit">Login</Button>
                        <p>Don't have an account? <Link href="/signup">SignUp</Link></p>
                    </form>
                </Paper>
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;