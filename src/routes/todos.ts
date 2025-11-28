import { Express, Request, Response } from 'express';
import { eq, ilike } from 'drizzle-orm';
import { db } from '../db/database';
import { todos, todoTags } from '../db/schema/schema';

export const todosMapper = (app: Express) => {
    app.get("/todos", async (req: Request, res: Response) => {
        const todosList = await db.select().from(todos)
            .leftJoin(todoTags, eq(todos.id, todoTags.todoId));
        res.json({ todos: todosList });
    });
    app.get("/todos/search/:query", async (req: Request, res: Response) => {
        const query = req.params.query;
        
        const todosList = await db.select().from(todos)
            .leftJoin(todoTags, eq(todos.id, todoTags.todoId))
            .where(ilike(todos.title, `%${query}%`));

        res.json({ todos: todosList });
    });
    app.get("/todos/:tag", async (req: Request, res: Response) => { 
        const tag = req.params.tag;

        const todosList = await db.select().from(todos)
            .leftJoin(todoTags, eq(todos.id, todoTags.todoId))
            .where(eq(todoTags.tag, tag));

        res.json({ todos: todosList });
    });
}
