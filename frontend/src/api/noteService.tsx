import axios from "axios";
import { Note } from "../types/note"; 
const API_URL = "http://localhost:5000/api/notes";

export const fetchNotes = async (token: string): Promise<Note[]> => {
  const response = await axios.get<Note[]>(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const createNote = async (token: string, title: string, content: string): Promise<Note> => {
  const response = await axios.post<Note>(API_URL, { title, content }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateNote = async (token: string, id: string, title: string, content: string): Promise<Note> => {
  const response = await axios.put<Note>(`${API_URL}/${id}`, { title, content }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const deleteNote = async (token: string, id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

