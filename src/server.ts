// src/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { todosMapper } from './routes/todos';

//load environment variables from .env files 
dotenv.config();

const username = process.env.username || null;
const password = process.env.password || null;

const url = process.env.url || "localhost:3000";

const app: Express = express();
const port = process.env.PORT || 3000;

const dburl = process.env.db || null;

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

todosMapper(app);

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