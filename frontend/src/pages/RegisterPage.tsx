import notebook from "../assets/notebook.jpg"
import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Paper,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRegisterForm } from "../hooks/userRegisterForm";

const RegisterPage = () => {
  const { register, handleSubmit, onSubmit, errors, loading, snackbar, setSnackbar } = useRegisterForm();

  return (
    <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
      {/* Left Side - App Info Section */}
      <Grid
        item
        xs={12}
        sm={6}
        md={7}
        sx={{
          backgroundImage: `url(${notebook})`,
          color: "white",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Black with 70% opacity
            borderRadius: "16px", // Rounded corners
            padding: "20px", // Adds padding for spacing
          }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Join NotesApp Today 📝
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 500, mb: 3 }}>
            Create, manage, and organize your notes efficiently. Get started now and experience seamless note-taking.
          </Typography>
        </div>
      </Grid>

      {/* Right Side - Register Form */}
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          {/* Form with react-hook-form */}
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              autoComplete="name"
              autoFocus
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            {/* Email Input */}
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {/* Password Input */}
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            {/* Submit Button */}
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>

            {/* Already have an account? */}
            <Box display="flex" justifyContent="center">
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Snackbar for Messages */}
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

export default RegisterPage;
