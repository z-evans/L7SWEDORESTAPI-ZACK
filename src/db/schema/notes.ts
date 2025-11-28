import { relations } from "drizzle-orm";
import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const notesTable = pgTable("notes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull().references(() => usersTable.id),
  title: text().notNull(),
  content: text().notNull(),
});

export const noteTagsTable = pgTable("note_tags", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  noteId: integer().notNull().references(() => notesTable.id),
  tag: text().notNull(),
});