import { Box, Typography, styled, Divider } from '@mui/material';

const Component = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
    opacity: 0.8,
});

const StyledDivider = styled(Divider)({
    width: '100%',
    marginTop: 10,
});

const NoMails = ({ message }) => {
    const defaultMessage = {
        heading: 'No Emails Found',
        subHeading: 'Please check back later.',
    };

    const { heading, subHeading } = message || defaultMessage;

    return (
        <Component>
            <Typography variant="h5">{heading}</Typography>
            <Typography variant="body2">{subHeading}</Typography>
            <StyledDivider />
        </Component>
    );
};

export default NoMails;
