import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { deleteTodo, fetchTodos } from "../../api/todoApi";
import AddTodoDialog from "./components/AddTodoDialog";

export default function TodoListPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [isAddTodoDialogOpen, setIsAddTodoDialogOpen] = useState(false);
  const handleAddTodoDialogOpen = () => {
    setIsAddTodoDialogOpen(true);
  };
  const handleAddTodoDialogClose = () => {
    setIsAddTodoDialogOpen(false);
  };

  const {
    isLoading,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  if (isLoading || todos === undefined)
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );

  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={0.5}
      >
        <Typography variant="h4" component="h1">
          ToDos
        </Typography>
        <IconButton aria-label="add" onClick={handleAddTodoDialogOpen}>
          <AddIcon />
        </IconButton>
        <AddTodoDialog
          isOpen={isAddTodoDialogOpen}
          handleClose={handleAddTodoDialogClose}
        />
      </Box>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton
                aria-label="delete"
                edge="end"
                onClick={() => {
                  handleDeleteTodo(todo.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton onClick={() => navigate(`/todo/${todo.id}`)}>
              <ListItemText primary={todo.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
