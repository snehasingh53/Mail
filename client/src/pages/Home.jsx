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
              This is a simple homepage using Material UI with a Navbar component imported from a separate file.
            </Typography>
            <Button variant="contained" color="primary">
              Learn More
            </Button>
          </Box>
        </Container>
      </main>
    </>
  );
}

export default Home;