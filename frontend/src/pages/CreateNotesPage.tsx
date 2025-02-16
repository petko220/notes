import { useNavigate } from "react-router-dom";
import { createNote } from "../api/noteService";
import NoteForm from "../components/NotesForm";

const CreateNotePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: { title: string; content: string }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized");

    await createNote(token, data.title, data.content);
    navigate("/notes");
  };

  return <NoteForm onSubmit={handleCreate} />;
};

export default CreateNotePage;
