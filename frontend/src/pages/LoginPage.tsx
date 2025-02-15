import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography,
  Paper,
  Snackbar,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // Use standard Grid
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "success" });

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setSnackbar({ open: true, message: "Login successful! Redirecting...", severity: "success" });

      setTimeout(() => navigate("/notes"), 1500);
    } catch (error) {
      setSnackbar({ open: true, message: "Invalid credentials. Try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
      {/* Left Side - App Info Section */}
      <Grid
        item
        xs={12}
        sm={6}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random/900x900/?notes,productivity)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to NotesApp 📝
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 500, mb: 3 }}>
          Organize your thoughts and ideas with ease. Manage your notes securely and efficiently.
        </Typography>
        <List>
          {["Secure & Private", "Easy Note Management", "Fast & Reliable"].map((text) => (
            <ListItem key={text}>
              <ListItemIcon>
                <CheckCircleOutlineIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Right Side - Login Form */}
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
            <Box display="flex" justifyContent="center">
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default LoginPage;
