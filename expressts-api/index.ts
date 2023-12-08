import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to Express + Typescript API</h1>')
})

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})