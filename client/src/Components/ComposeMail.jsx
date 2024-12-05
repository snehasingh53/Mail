import { React, useState } from 'react';
import { Dialog, Box, TextField, Typography, styled, IconButton, Button, InputBase } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Styles for Dialog, Header, Footer, and RecipientWrapper
const dialogStyled = {
  height: '90%',
  width: '80%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  borderRadius: '10px 10px 0 0',
};

const Header = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  background: '#f2f6fc',
  padding: '15px',
  '& > p': {
    fontSize: 16,
    fontWeight: 600,
  },
}));

const RecipientWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 15px',
  '& > div': {
    fontSize: 14,
    marginTop: '10px',
    marginBottom: '10px',
    '& .MuiInputBase-root': {
      borderBottom: '1px solid #f5f5f5',
      padding: '10px 5px',
    },
  },
}));

const Footer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 15px',
  alignItems: 'center',
}));

// ComposeMail Component
const ComposeMail = ({ openDialog, handleClose }) => {
  const [data, setData] = useState({});

  const config = {
    Host: "smtp.elasticemail.com",
    Username: import.meta.env.REACT_APP_USERNAME,
    Password: import.meta.env.REACT_APP_PASSWORD,
    PORT: 2525,
  };

  // Function to handle form input changes
  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Function to send the email using SMTP
  const sendMail = async (e) => {
    e.preventDefault();
  
    // Ensure we have all necessary data
    if (!data.to || !data.subject || !data.body) {
      alert("Please fill all fields");
      return;
    }
  
    try {
      // Send the email request to the backend
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: data.to,
          subject: data.subject,
          text: data.body, // Make sure to use 'text' here to match the backend
        }),
      });
  
      const result = await response.json();
  
      // If the email is sent successfully
      if (response.status === 200) {
        alert("Email sent successfully");
        handleClose(); // Close the compose mail dialog
      } else {
        alert("Error sending email: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email: " + error.message);
    }
  };
  

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyled }}>
      <Box>
        <Header>
          <Typography>New Message</Typography>
          <IconButton size="small" edge="end" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Header>
      </Box>

     
  
        <RecipientWrapper>
        <InputBase placeholder="Recipients" name="to"
          onChange={(e)=>onValueChange(e)} />
        <InputBase placeholder="Subject" name="subject"
        onChange={(e)=>onValueChange(e)}  />
      </RecipientWrapper>
   

      <TextField
        multiline
        rows={20}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        name="body"
        onChange={onValueChange}
        fullWidth
        margin="normal"
      />

      <Footer>
        <Button
          variant="contained"
          onClick={sendMail}
          sx={{ borderRadius: "18px", padding: "10px 20px", textTransform: "none" }}
        >
          Send
        </Button>
        <IconButton size="small" onClick={handleClose}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
