import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (name: string, email: string, password: string): Promise<string> => {
  const response = await axios.post<{ token: string }>(`${API_URL}/register`, { name, email, password });
  const { token } = response.data;
  localStorage.setItem("token", token);
  return token;
};

export const loginUser = async (email: string, password: string): Promise<string> => {
  const response = await axios.post<{ token: string }>(`${API_URL}/login`, { email, password });
  const { token } = response.data;
  localStorage.setItem("token", token);
  return token;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};