import { eq, ilike, inArray } from "drizzle-orm";
import { db } from "../db/database";
import { todo, todos, todoTags } from "../db/schema/schema";

export const mapTagsToTodos = async (todos: todo[]) => {
  const todoIds = todos.map((t) => t.id);
  const tags = await db
    .select()
    .from(todoTags)
    .where(inArray(todoTags.todoId, todoIds));
  return todos.map((t) => ({
    ...t,
    tags: tags.filter((tag) => tag.todoId === t.id),
  }));
};

export const getTodos = async () => {
  const todosList = await db.select().from(todos);
  return mapTagsToTodos(todosList);
};

export const getTodoById = async (id: number) => {
  const todo = await db.select().from(todos).where(eq(todos.id, id));
  const todoWithTags = await mapTagsToTodos(todo);
  return todoWithTags[0];
};

export const getTodosByTitle = async (title: string) => {
  const todosList = await db
    .select()
    .from(todos)
    .where(ilike(todos.title, `%${title}%`));
  return mapTagsToTodos(todosList);
};

export const createTodo = async (title: string, description: string) => {
  const newTodo = await db
    .insert(todos)
    .values({ title, description })
    .returning();
  return newTodo[0];
};

export const updateTodo = async (
  id: number,
  title: string,
  description: string
) => {
  const updatedTodo = await db
    .update(todos)
    .set({ title, description })
    .where(eq(todos.id, id))
    .returning();
  return updatedTodo[0];
};

export const deleteTodo = async (id: number) => {
  const deleted = await db.delete(todos).where(eq(todos.id, id));
  return (deleted.rowCount ?? 0) > 0;
};
