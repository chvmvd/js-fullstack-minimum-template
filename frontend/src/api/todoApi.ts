import { Todo } from "../types";
import { API_ENDPOINT } from "./config";

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_ENDPOINT}/todos`);
  return response.json();
}

export async function fetchTodoById(id: string): Promise<Todo> {
  const response = await fetch(`${API_ENDPOINT}/todos/${id}`);
  return response.json();
}

export async function createTodo(todo: {
  title: string;
  description: string;
}): Promise<void> {
  await fetch(`${API_ENDPOINT}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
}

export async function updateTodo(todo: Todo): Promise<void> {
  await fetch(`${API_ENDPOINT}/todos/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
}

export async function deleteTodo(id: string): Promise<void> {
  await fetch(`${API_ENDPOINT}/todos/${id}`, {
    method: "DELETE",
  });
}
