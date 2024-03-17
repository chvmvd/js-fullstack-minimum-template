import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { fetchTodoById } from "../../api/todoApi";
import EditTodoDialog from "./components/EditTodoDialog";

export default function TodoDetailPage() {
  const { id } = useParams();

  const {
    isLoading,
    error,
    data: todo,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => {
      if (id === undefined) {
        throw new Error("id is undefined");
      }
      return fetchTodoById(id);
    },
  });

  const [isEditTodoDialogOpen, setIsEditTodoDialogOpen] = useState(false);
  const handleEditTodoDialogOpen = () => {
    setIsEditTodoDialogOpen(true);
  };
  const handleEditTodoDialogClose = () => {
    setIsEditTodoDialogOpen(false);
  };

  if (isLoading || todo === undefined)
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );

  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Paper sx={{ p: 2, minHeight: "50vh" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" component="h1">
          {todo.title}
        </Typography>
        <IconButton aria-label="edit" onClick={handleEditTodoDialogOpen}>
          <EditIcon />
        </IconButton>
        <EditTodoDialog
          todo={todo}
          isOpen={isEditTodoDialogOpen}
          handleClose={handleEditTodoDialogClose}
        />
      </Box>
      <Typography>{todo.description}</Typography>
    </Paper>
  );
}
