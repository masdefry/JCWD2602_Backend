import express, { Express, Request, Response } from "express";
import fs from 'fs'; // FS: File System ---> Untuk Reading File

const app: Express = express();

// 1.2. 
app.use(express.json()) // Body Parser ---> Untuk Mengambil Data Body from Client
const port: number = 5000;

app.get('/', (req: Request, res: Response) => {
    // Req: Digunakan Untuk Mengambil Resource dari Client
    // Res: Digunakan Untuk Mengirim Response Menuju Client
    res.send('<h1>Welcome to Express + Typescript API</h1>')
})

interface IUsers{
    id: number, 
    username: string, 
    email: string, 
    password: string
}

// Get Data Users
app.get('/users', (req: Request, res: Response) => {
    try {
        // Step-01 Reading File "db.json"
        // JSON.parse Digunakan Untuk Merubah Format Buffer Menjadi Object JS
        const {users}: {users: Array<IUsers>} = JSON.parse(fs.readFileSync('./database/db.json', 'utf-8'))

        // Step-02 Sending to Client
        res.send({
            error: false, 
            message: 'Get Users Success!', 
            data: users
        })
    } catch (error) {
        console.log(error)
    }
})

// Post/Create Data Users
app.post('/users', (req: Request, res: Response) => {
    try {     
        // Step-01 Reading File "db.json"
        // JSON.parse Digunakan Untuk Merubah Format Buffer Menjadi Object JS
        const findAllUsers: {users: Array<IUsers>} = JSON.parse(fs.readFileSync('./database/db.json', 'utf-8')) // Array of Object
        // findAllUsers = { users: [{}] } ---> findAllUsers.users ---> [{}]

        // Step-02 Get Resource Body from Client
        const data: IUsers = {id: findAllUsers.users.length+1, ...req.body} // Object 

        // Step-03 Push "data" into "users"
        findAllUsers.users.push(data)
        
        // Step-04 Save "users" into "db.json"
        fs.writeFileSync('./database/db.json', JSON.stringify(findAllUsers))

        // Step-05 Sending Response to Client
        res.send({
            error: false, 
            message: 'Create User Success!', 
            data: null
        })

    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})