import { pgTable, integer, text } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull(),
  title: text().notNull(),
  content: text().notNull(),
});