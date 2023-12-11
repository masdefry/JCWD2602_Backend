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
        const {users}: {users: Array<IUsers>} = read()

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
        const findAllUsers: {users: Array<IUsers>} = read()
        // findAllUsers = { users: [{}] } ---> findAllUsers.users ---> [{}]

        // Step-02 Get Resource Body from Client
        const data: IUsers = {id: findAllUsers.users.length+1, ...req.body} // Object 

        // Step-03 Push "data" into "users"
        findAllUsers.users.push(data)
        
        // Step-04 Save "users" into "db.json"
        write(findAllUsers)

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

// PUT DATA
app.put('/users/:id', (req: Request, res: Response) => {
    try {
        // Step-01 Reading "db.json"
        const findAllUsers: {users: Array<IUsers>} = read()

        // Step-02 Get Data from "req.body"
        const {id} = req.params
        const data: IUsers = req.body // Object 

        // Step-03 Manipulate Data
        // findAllUsers.users = [{0}, {1}]
        findAllUsers.users.forEach((item, index) => {
            // {id, username, email, password}
            if(item.id === Number(id)){
                findAllUsers.users[index] = {...data, id: item.id}
            }
        })

        // Step-04 Save Data into "db.json"
        write(findAllUsers)

        // Step-05 Sending Response to Client
        res.send({
            error: false, 
            message: 'Update User Success!', 
            data: null
        })

    } catch (error) {
        
    }
})

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        // Step-01 Reading "db.json"
        const findAllUsers: {users: Array<IUsers>} = read()

        // Step-02 Get Data from "req.body"
        const {id} = req.params

        // Step-03 Manipulate Data
        // findAllUsers.users = [{0}, {1}]
        findAllUsers.users.forEach((item, index) => {
            if(item.id === Number(id)) findAllUsers.users.splice(index, 1)
        })

        // Step-04 Save Data into "db.json"
        write(findAllUsers)

        // Step-05 Sending Response to Client
        res.send({
            error: false, 
            message: 'Update User Success!', 
            data: null
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