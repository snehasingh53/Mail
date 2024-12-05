import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logout from './Logout'; // Assuming you want to use the Logout component

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const buttonStyle = { marginRight: '20px', fontSize: '1.2rem', fontWeight: '700', padding: '0.3rem 1.4rem' };

    return (
        <AppBar sx={{ bgcolor: 'blue' }}>
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    MailServer
                </Typography>
                {!isLoggedIn ? ( // Corrected here
                    <>
                        <Button variant="contained" style={buttonStyle} color="error" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" style={buttonStyle} color="success" component={Link} to="/signup">
                            Signup
                        </Button>
                    </>
                ) : (
                    <>
                        <Logout setIsLoggedIn={setIsLoggedIn} />
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;