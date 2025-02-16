import { useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/registerSchema";
import { registerUser } from "../api/authService";
import { useNavigate } from "react-router-dom";

export const useRegisterForm = () => {
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
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "success" });

    try {
      await registerUser(data.name, data.email, data.password);
      setSnackbar({ open: true, message: "Registration successful!", severity: "success" });

      navigate("/notes");
    } catch (error) {
      setSnackbar({ open: true, message: "Registration failed. Try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, onSubmit, errors, loading, snackbar, setSnackbar };
};
