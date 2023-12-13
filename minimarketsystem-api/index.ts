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

app.get('/admin/transaction', (req: Request, res: Response) => {
    try {
        // Step-01 Get Data from "db.json"
        const findData = read()

        // Step-02 Get "startdate" & "enddate"
        const {startdate, enddate} = req.query as {startdate: string, enddate: string}

        // Step-03 Manipulate Data
        const findTransactionLists = findData.transactions.filter((item: any, index: number) => {
            return (new Date(item.createdAt) >= new Date(startdate) && new Date(item.createdAt) <= new Date(enddate))
        })

        findTransactionLists.forEach((item: any, index: number) => {
            findData.users.forEach((usersItem: any, idx: number) => {
                if(item.usersId === usersItem.id){
                    findTransactionLists[index].usersId = usersItem
                }
            })

            findData.products.forEach((productsItem: any, idx: number) => {
                if(item.productsId === productsItem.id){
                    findTransactionLists[index].productsId = productsItem
                }
            })
        })
        
        // Step-04 
        res.status(200).send({
            error: false, 
            message: 'Get Transaction List Success!', 
            data: findTransactionLists
        })

    } catch (error) {
        
    }
})

app.get('/admin/income', (req: Request, res: Response) => {
    try {
        // Step-01 Get Data from "db.json"
        const findData = read()

        const {month, year} = req.query as {month: string, year: string}

        let totalIncome: number = 0
        findData.transactions.forEach((item: any, index: number) => {
            if(month === item.createdAt.split('-')[1]) totalIncome += item.total
            if(year === item.createdAt.split('-')[0]) totalIncome += item.total
        })

        res.status(200).send({
            error: false, 
            message: 'Get Total Income Success', 
            data: totalIncome
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})