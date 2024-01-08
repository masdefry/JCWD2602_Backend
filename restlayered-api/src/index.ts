import express, { Express, NextFunction, Request, Response } from "express";
import cors from 'cors';

const app: Express = express();
app.use(cors())

const port: number = 5000;

// Import index.ts Routers
import route from "./routers";

app.get('/', (req: Request, res: Response) => {
    // Req: Digunakan Untuk Mengambil Resource dari Client
    // Res: Digunakan Untuk Mengirim Response Menuju Client
    res.send('<h1>Welcome to Tracker Expenses API</h1>')
})

app.use(route)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('111')
    res.status(500).send({
        error: true, 
        message: 'Something Went Wrong!',
        data: null
    })
})

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})