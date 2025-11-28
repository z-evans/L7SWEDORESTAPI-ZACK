// src/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { notesTable } from './db/schema/notes';
import { drizzle } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm';
import { noteTagsTable } from './db/schema/notes';

//load environment variables from .env files 
dotenv.config();

const username = process.env.username || null;
const password = process.env.password || null;

const url = process.env.url || "localhost:3000";

const app: Express = express();
const port = process.env.PORT || 3000;

const dburl = process.env.db || null;

const db = drizzle(process.env.DATABASE_URL!);

//middleware 
app.use(cors()); //ENABLE CORS
app.use(express.json()); //parse every received body as JSON


//a simple test route 
app.get("/" , (req:Request, res: Response) =>
{
    res.send("Express + Typescript + MongoDB server running as expected!!!");
});
app.get("/hello" , (req:Request, res: Response) =>
{
    res.send("Hello World!");
});

app.get("/notes/:id", async (req: Request, res: Response) => {
    // Logic to fetch notes from the database
    const notes = await db.select().from(notesTable)
        .leftJoin(noteTagsTable, eq(notesTable.id, noteTagsTable.noteId))
        .where(eq(notesTable.userId, Number(req.params.id)));
    res.json({ notes }); // Placeholder response
});

app.get("/notes/:id/:tag", async (req: Request, res: Response) => { 
    const userId = Number(req.params.id);
    const tag = req.params.tag;

    const notes = await db.select().from(notesTable)
        .leftJoin(noteTagsTable, eq(notesTable.id, noteTagsTable.noteId))
        .where((and(eq(notesTable.userId, userId), eq(noteTagsTable.tag, tag))));

    res.json({ notes });
});

//function to start the server
const startServer = async () => 
{
    try
    {
        app.listen(port, () => {
            console.log("Server is running on port:" + port);
        })
    }catch (error)
    {
        console.error("Error when starting server -> ", error)

        process.exit(1)
    }
}

startServer();