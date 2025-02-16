import { Grid } from "@mui/material";
import NoteCard from "./NotesCard";

interface NotesListProps {
  notes: { id: number; title: string; content: string }[];
  onDelete: (id: number) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onDelete }) => {
  return (
    <Grid container spacing={3}>
      {notes.map((note) => (
        <Grid item xs={12} sm={6} md={4} key={note.id}>
          <NoteCard id={note.id} title={note.title} content={note.content} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default NotesList;
