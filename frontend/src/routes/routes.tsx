import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotesPage from "../pages/NotesPage";
import CreateNotePage from "../pages/CreateNotesPage";
import EditNotePage from "../pages/EditNotePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/create" element={<CreateNotePage />} />
        <Route path="/notes/edit/:id" element={<EditNotePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
