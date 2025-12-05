import { pgTable, integer, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text().notNull(),
  completed: boolean().notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const todoTags = pgTable("todo_tags", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  todoId: integer().notNull().references(() => todos.id),
  tag: text().notNull(),
});

export type todo = typeof todos.$inferSelect;
export type todoTag = typeof todoTags.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;  
export type NewTodoTag = typeof todoTags.$inferInsert;
