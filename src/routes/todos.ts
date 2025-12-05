import { Request, Response, Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  getTodosByTitle,
  updateTodo,
} from "../service/todoService";

const router = Router();

router.get("/todos", async (req: Request, res: Response) => {
  res.json(await getTodos());
});

router.get("/todos/:id", async (req: Request, res: Response) => {
  const todoId = parseInt(req.params.id);
  const todo = await getTodoById(todoId);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found." });
  }
  res.json(todo);
});

router.get("/todos/search/:title", async (req: Request, res: Response) => {
  const title = req.params.title;
  const todos = await getTodosByTitle(title);
  res.json(todos);
});

router.post("/todos", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const newTodo = await createTodo(title, description);
  res.status(201).json(newTodo);
});

router.put("/todos/:id", async (req: Request, res: Response) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = await updateTodo(
    todoId,
    req.body.title,
    req.body.description
  );
  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found." });
  }
  res.json(updatedTodo);
});

router.delete("/todos/:id", async (req: Request, res: Response) => {
  const todoId = parseInt(req.params.id);
  (await deleteTodo(todoId))
    ? res.status(204).send()
    : res.status(404).json({ message: "Todo not found." });
});

export default router;
