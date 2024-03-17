import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

const port = 3000;

app.use(express.json());
app.use(cors({ origin: process.env.WEB_ORIGIN }));

app.get("/", async (request, response) => {
  response.send("Welcome to the ToDo API!");
});

app.get("/todos", async (request, response) => {
  const todos = await prisma.todo.findMany();
  response.json(todos);
});

app.get("/todos/:id", async (request, response) => {
  const { id } = request.params;
  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });
  response.json(todo);
});

app.post("/todos", async (request, response) => {
  const { title, description } = request.body;
  const todo = await prisma.todo.create({
    data: {
      title: title,
      description: description,
    },
  });
  response.json(todo);
});

app.patch("/todos/:id", async (request, response) => {
  const { id } = request.params;
  const { title, description } = request.body;
  const todo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
    },
  });
  response.json(todo);
});

app.delete("/todos/:id", async (request, response) => {
  const { id } = request.params;
  const todo = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  response.json(todo);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}.`);
});
