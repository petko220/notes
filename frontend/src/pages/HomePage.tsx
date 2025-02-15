import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container className="main-container" maxWidth="md" style={{ textAlign: "center", marginTop: "50px", alignItems: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Notes App 📒
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Securely create, update, and manage your personal notes with ease.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login" style={{ marginRight: "10px" }}>
        Login
      </Button>
      <Button variant="outlined" color="secondary" component={Link} to="/register">
        Register
      </Button>
    </Container>
  );
};

export default HomePage;
