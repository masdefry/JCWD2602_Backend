import express, { Express, Request, Response } from "express";

// Import FS
import { read, write } from "./utils/fs";

const app: Express = express();

// 1.2. 
app.use(express.json()) // Body Parser ---> Untuk Mengambil Data Body from Client
const port: number = 5000;

app.get('/', (req: Request, res: Response) => {
    // Req: Digunakan Untuk Mengambil Resource dari Client
    // Res: Digunakan Untuk Mengirim Response Menuju Client
    res.send('<h1>Welcome to Tracker Expenses API</h1>')
})

// /expenses GET
// /expenses/:id GET
// /expenses POST
// /expenses/:id PUT
// /expenses/:id DELETE

app.get('/expenses-date-range', (req: Request, res: Response) => {
    try {
        const { startdate, enddate } = req.query as { startdate: string, enddate: string }
        
        const findAllExpenses = read()
        console.log(findAllExpenses)
        
        let totalExpenses: number = 0
        findAllExpenses.expenses.forEach((item: any, index: number) => {
            if(item.date >= startdate && item.date <= enddate) totalExpenses += item.ammount
        })
        
        res.status(200).send({
            error: false, 
            message: 'Get Expenses by Date Range Success!', 
            data: totalExpenses
        })
    } catch (error) {
        
    }
})

app.get('/expenses-category/:categoryId', (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params as { categoryId: string }
        
        const findAllExpenses = read()
        
        let totalExpenses: number = 0
        findAllExpenses.expenses.forEach((item: any, index: number) => {
            if(item.categoryId === Number(categoryId)) totalExpenses += item.ammount
        })
        
        res.status(200).send({
            error: false, 
            message: 'Get Expenses by Date Range Success!', 
            data: totalExpenses
        })
    } catch (error) {
        
    }
})

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})





// Exercise
// Buatlah endpoint login, dengan ketentuan
//      - Method    : GET
//      - Login By  : Email/Username & Password