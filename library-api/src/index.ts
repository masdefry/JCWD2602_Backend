import express, { Express, Request, Response } from "express";

const app: Express = express();

// 1.2. 
app.use(express.json()) // Body Parser ---> Untuk Mengambil Data Body from Client
const port: number = 5000;

// IMPORT DATABASE SETUP
import db from "./connection";
import util from 'util';
const query: any = util.promisify(db.query).bind(db);

app.get('/', (req: Request, res: Response) => {
    // Req: Digunakan Untuk Mengambil Resource dari Client
    // Res: Digunakan Untuk Mengirim Response Menuju Client
    res.send('<h1>Welcome to Tracker Expenses API</h1>')
})

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})