import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/registerSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  // Handle form submission
  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "success" });

    try {
      await axios.post("http://localhost:5000/api/auth/register", data);

      setSnackbar({ open: true, message: "Registration successful! Redirecting...", severity: "success" });

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setSnackbar({ open: true, message: "Registration failed. Please try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, onSubmit, errors, loading, snackbar, setSnackbar };
};
