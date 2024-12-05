import React, { useState } from 'react';
import { Box, Button, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorder from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import ComposeMail from './ComposeMail';
import { useNavigate, useLocation } from 'react-router-dom';

const ComposeButton = styled(Button)(() => ({
  background: '#c2e7ff',
  color: '#001d35',
  padding: 16,
  borderRadius: 16,
  minWidth: 148,
  textTransform: 'none',
}));

const SidebarContent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const location = useLocation();

  const onComposeClick = () => {
    setOpenDialog(true); // Open the dialog when the "Compose" button is clicked
  };

  const handleClose = () => {
    setOpenDialog(false); // Close the dialog when the close button is clicked
  };

  return (
    <Box>
      <ComposeButton onClick={onComposeClick}>
        <CreateIcon sx={{ marginRight: 1 }} /> Compose
      </ComposeButton>
      <Box>
        <List>
          {/* Sent Mail */}
          <ListItemButton
            onClick={() => navigate('/email/sent')} // Use navigate instead of history.push
            selected={location.pathname === '/email/sent'}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SendIcon sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>

          {/* Drafts */}
          <ListItemButton
            onClick={() => navigate('/email/drafts')}
            selected={location.pathname === '/email/drafts'}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DraftsIcon sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>

          {/* Inbox */}
          <ListItemButton
            onClick={() => navigate('/email/inbox')}
            selected={location.pathname === '/email/inbox'}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <InboxIcon sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>

          {/* Starred */}
          <ListItemButton
            onClick={() => navigate('/email/starred')}
            selected={location.pathname === '/email/starred'}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <StarBorder sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>

          {/* Trash */}
          <ListItemButton
            onClick={() => navigate('/email/trash')}
            selected={location.pathname === '/email/trash'}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DeleteIcon sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItemButton>

          {/* Spam */}
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ErrorIcon sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText primary="Spam" />
          </ListItemButton>
        </List>
      </Box>

      <ComposeMail openDialog={openDialog} handleClose={handleClose} />
    </Box>
  );
};

export default SidebarContent;