import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
