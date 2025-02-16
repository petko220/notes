import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
  } from "@mui/material";
  import { Delete, Edit } from "@mui/icons-material";
  import { useNavigate } from "react-router-dom";
  
  interface NoteCardProps {
    id: number;
    title: string;
    content: string;
    onDelete: (id: number) => void;
  }
  
  const NoteCard: React.FC<NoteCardProps> = ({ id, title, content, onDelete }) => {
    const navigate = useNavigate();
  
    return (
      <Card sx={{ transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {content.length > 100 ? content.substring(0, 100) + "..." : content}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="primary" onClick={() => navigate(`/notes/edit/${id}`)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(id)}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    );
  };
  
  export default NoteCard;
  