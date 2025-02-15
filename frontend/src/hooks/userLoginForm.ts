import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/loginSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  // Handle form submission
  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "success" });

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", data);
      localStorage.setItem("token", response.data.token);
      setSnackbar({ open: true, message: "Login successful! Redirecting...", severity: "success" });

      setTimeout(() => navigate("/notes"), 1500);
    } catch (error) {
      setSnackbar({ open: true, message: "Invalid credentials. Try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, onSubmit, errors, loading, snackbar, setSnackbar };
};