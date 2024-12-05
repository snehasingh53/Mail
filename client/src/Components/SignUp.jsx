import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Link, Button, Paper, TextField, Typography, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !password) {
            setErrorMessage("All fields are required.");
            setOpen(true);
            return;
        }

        axios.post("http://localhost:3001/signup", { name, email, password })
            .then(result => {
                if (result.status === 201) {
                    navigate("/login");
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    setErrorMessage("Email already exists. Please use a different email.");
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                }
                setOpen(true);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const paperStyle = {
        padding: "2rem",
        margin: "100px auto",
        borderRadius: "1rem",
        boxShadow: "10px 10px 10px"
    };
    const heading = { fontSize: "2.5rem", fontWeight: "600" };
    const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem" };

    return (
        <div>
            <Grid align="center" className="wrapper">
                <Paper style={paperStyle} sx={{
                    width: {
                        xs: '80vw',
                        sm: '50vw',
                        md: '40vw',
                        lg: '30vw',
                        xl: '20vw',
                    },
                    height: {
                        lg: '60vh',
                    }
                }}>
                    <Typography component="h1" variant="h5" style={heading}> Signup </Typography>
                    <form onSubmit={handleSignup}>
                        <TextField
                            fullWidth
                            label="Enter Name"
                            variant="outlined"
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                        />
                        <Button style={btnStyle} variant="contained" type="submit">SignUp</Button>
                    </form>
                    <p>Already have an account?<Link href="/login"> Login</Link></p>
                </Paper>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SignUp;