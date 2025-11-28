import { Express, Request, Response } from 'express';
import { notesTable } from '../db/schema/notes';
import { and, eq } from 'drizzle-orm';
import { noteTagsTable } from '../db/schema/notes';
import { db } from '../db/database';

export const notesMapper = (app: Express) => {
    app.get("/notes/:id", async (req: Request, res: Response) => {
    // Logic to fetch notes from the database
    const notes = await db.select().from(notesTable)
        .leftJoin(noteTagsTable, eq(notesTable.id, noteTagsTable.noteId))
        .where(eq(notesTable.userId, Number(req.params.id)));
    res.json({ notes });
});

app.get("/notes/:id/:tag", async (req: Request, res: Response) => { 
    const userId = Number(req.params.id);
    const tag = req.params.tag;

    const notes = await db.select().from(notesTable)
        .leftJoin(noteTagsTable, eq(notesTable.id, noteTagsTable.noteId))
        .where((and(eq(notesTable.userId, userId), eq(noteTagsTable.tag, tag))));

    res.json({ notes });
});
}
