import express, { Express, Request, Response } from "express";
import moment from 'moment';
import cors from 'cors';

const app: Express = express();
app.use(cors())

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

app.get('/admin', async(req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.query as {username: string, password: string}

        const findAdmin: any = await query(`SELECT * FROM admins a
        JOIN shift_time st ON a.shift_time_id = st.id WHERE username = ? AND password = ?`, [username, password])
        
        if(findAdmin.length === 0) throw {status: 300, message: 'Login Failed!'}
        
        const loginTime: any = moment(new Date(), 'HH:mm:ss')
        const clockIn: any = moment(findAdmin[0].clock_in, 'HH:mm:ss')
        const clockOut: any = moment(findAdmin[0].clock_out, 'HH:mm:ss')
        
        if(loginTime.isBetween(clockIn, clockOut) === false) 
        throw {status: 400, message: 'Login Failed! Not in Shift Time!'}

        res.status(200).send({
            error: false, 
            message: 'Login Success', 
            data: null
        })
    } catch (error: any) {
        res.status(error.status || 500).send({
            error: true, 
            message: error.message, 
            data: null
        })
    }
})

app.post('/admin', async(req: Request, res: Response): Promise<void> => {
    try {
        await query('START TRANSACTION')

        const {title, publisher, publish_year, branch_id, category_id} = req.body 

        const {insertId} = await query(`INSERT INTO books SET ?`, {
            title, publisher, publish_year
        })

        branch_id.forEach((item: any) => {
            item.unshift(insertId)
            item.push(0)
        })

        category_id.forEach((item: any) => {
            item.push(insertId)
        })

        await query(`INSERT INTO books_has_branch(books_id, branch_id, stocks, total_borrowed) VALUES ?`, [branch_id])
        await query(`INSERT INTO category_has_books(category_id, books_id) VALUES ?`, [category_id])
        
        await query('COMMIT')

        res.status(201).send({
            error: false, 
            message: 'Create New Book Success!', 
            data: null 
        })
    } catch (error) {
        await query('ROLLBACK')
        console.log(error)
    }
})

app.get('/category-branch', async(req: Request, res: Response): Promise<void> => {
    try {
        const findCategories: any = await query('SELECT * FROM categories')
        const findBranch: any = await query('SELECT id, name FROM branches')

        res.status(200).send({
            error: false, 
            message: 'Get Categories & Branches Success!', 
            data: {
                findCategories, 
                findBranch
            }
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})