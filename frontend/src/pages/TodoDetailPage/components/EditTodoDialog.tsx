import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { updateTodo } from "../../../api/todoApi";
import { Todo } from "../../../types";

type EditTodoDialogProps = {
  todo: Todo;
  isOpen: boolean;
  handleClose: () => void;
};

export default function EditTodoDialog(props: EditTodoDialogProps) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(props.todo.title);
  const [description, setDescription] = useState(props.todo.description);

  const editTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", props.todo.id] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleEditTodo = () => {
    editTodoMutation.mutate({
      id: props.todo.id,
      title: title,
      description: description,
    });
    props.handleClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleEditTodo();
        },
      }}
    >
      <DialogTitle>Edit ToDo</DialogTitle>
      <DialogContent>
        <TextField
          required
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ my: 1 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ my: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button type="submit">Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
