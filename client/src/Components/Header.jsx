import React, { useState } from 'react';
import { AppBar, Toolbar, InputBase, Box, styled, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import Tune from '@mui/icons-material/Tune';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Use styled() correctly to style Box
const SearchWrapper = styled(Box)(() => ({
    background: '#EAF1FB',
    marginLeft: '80px',
    borderRadius: 8,
    minWidth: 680,
    maxWidth: 720,
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    '& > div': {
        width: '100%',
        padding: '0 10px',
    },
}));

const Header = ({ toggleDrawer }) => {
    const [anchorEl, setAnchorEl] = useState(null); // State for the dropdown menu
    const navigate = useNavigate(); // Initialize useNavigate

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); // Open the menu
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the menu
    };

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing tokens, etc.)
        // After logout logic, navigate to the home page
        navigate('/'); // Redirect to home page
        handleMenuClose(); // Close the menu after logout
    };

    return (
        <AppBar>
            <Toolbar>
                <MenuIcon sx={{ color: 'white' }} onClick={toggleDrawer} />
                <SearchWrapper>
                    <Search sx={{ color: '#212121' }} />
                    <InputBase placeholder="Search mail" />
                    <Tune sx={{ color: '#212121' }} />
                </SearchWrapper>
                <IconButton
                    sx={{ color: 'white', ml: 'auto' }}
                    onClick={handleMenuClick}
                >
                    <AccountCircle sx={{ fontSize: '36px' }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;