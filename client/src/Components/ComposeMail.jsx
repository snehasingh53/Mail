import { useState } from 'react';
import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material'; 
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
import { toast } from 'react-toastify';

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',
};

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;

const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;

const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
    &:hover {
        background: #084aa6;
    }
`;

const ComposeMail = ({ open, setOpenDrawer }) => {
    const [data, setData] = useState({ to: '', subject: '', body: '' });
    const sentEmailService = useApi(API_URLS.saveSentEmails);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const emailConfig = {
        Host: "smtp.elasticemail.com",
        Username: import.meta.env.VITE_APP_USERNAME,
        Password: import.meta.env.VITE_APP_PASSWORD,
        Port: 2525,
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();

        if (window.Email) {
            try {
                const message = await window.Email.send({
                    ...emailConfig,
                    To: data.to,
                    From: "ssnehasingh53@gmail.com",
                    Subject: data.subject,
                    Body: data.body,
                });
                toast.success(message);
            } catch (error) {
                toast.error("Failed to send email.");
                return;
            }
        }

        const payload = {
            ...data,
            from: "ssnehasingh53@gmail.com",
            date: new Date(),
            image: '',
            name: 'Sneha Singh',
            starred: false,
            type: 'sent',
        };

        await sentEmailService.call(payload);

        if (!sentEmailService.error) {
            setOpenDrawer(false);
            setData({ to: '', subject: '', body: '' });
        } else {
            toast.error("Failed to save email to sent items.");
        }
    };

    const handleCloseComposeMail = async (e) => {
        e.preventDefault();

        const payload = {
            ...data,
            from: "ssnehasingh53@gmail.com",
            date: new Date(),
            image: '',
            name: 'Sneha Singh',
            starred: false,
            type: 'drafts',
        };

        await saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDrawer(false);
            setData({ to: '', subject: '', body: '' });
        } else {
            toast.error("Failed to save email as draft.");
        }
    };

    return (
        <Dialog
            open={open}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={handleCloseComposeMail} />
            </Header>
            <RecipientWrapper>
                <InputBase 
                    placeholder="Recipients" 
                    name="to" 
                    onChange={handleInputChange} 
                    value={data.to} 
                />
                <InputBase 
                    placeholder="Subject" 
                    name="subject" 
                    onChange={handleInputChange} 
                    value={data.subject} 
                />
            </RecipientWrapper>
            <TextField 
                multiline
                rows={20}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                name="body"
                onChange={handleInputChange}
                value={data.body}
            />
            <Footer>
                <SendButton onClick={handleSendEmail}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDrawer(false)} />
            </Footer>
        </Dialog>
    );
};

export default ComposeMail;
