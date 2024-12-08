import { useAuth } from "../store/auth"; 
import { Container, Typography, Button, Box } from '@mui/material';
import Navbar from '../Components/Navbar';

const Home = () => {
  const { user } = useAuth();

  return (
    <>  
      <main>
        <Navbar />
        <Container maxWidth="lg">
          <Box sx={{ paddingTop: '100px', textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
              Welcome to the Home Page
            </Typography>
            <Typography variant="h4" gutterBottom>
              {user ? user.username : 'Guest'}
            </Typography>
            <Typography variant="body1" paragraph>
              This is a simple homepage for MailServer. This uses IMAP and SMTP .
            </Typography>
            
          </Box>
        </Container>
      </main>
    </>
  );
}

export default Home;