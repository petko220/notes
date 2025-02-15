import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

export const fetchNotes = async (token: string) => {
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const createNote = async (token: string, title: string, content: string) => {
  const response = await axios.post(API_URL, { title, content }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const deleteNote = async (token: string, id: number) => {
  await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
