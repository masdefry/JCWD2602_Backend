"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import FS
const fs_1 = require("./utils/fs");
const app = (0, express_1.default)();
// 1.2. 
app.use(express_1.default.json()); // Body Parser ---> Untuk Mengambil Data Body from Client
const port = 5000;
app.get('/', (req, res) => {
    // Req: Digunakan Untuk Mengambil Resource dari Client
    // Res: Digunakan Untuk Mengirim Response Menuju Client
    res.send('<h1>Welcome to Express + Typescript API</h1>');
});
// Get Data Users
app.get('/users', (req, res) => {
    try {
        // Step-01 Reading File "db.json"
        // JSON.parse Digunakan Untuk Merubah Format Buffer Menjadi Object JS
        const { users } = (0, fs_1.read)();
        // Step-02 Sending to Client
        res.send({
            error: false,
            message: 'Get Users Success!',
            data: users
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Post/Create Data Users
app.post('/users', (req, res) => {
    try {
        // Step-01 Reading File "db.json"
        // JSON.parse Digunakan Untuk Merubah Format Buffer Menjadi Object JS
        const findAllUsers = (0, fs_1.read)();
        // findAllUsers = { users: [{}] } ---> findAllUsers.users ---> [{}]
        // Step-02 Get Resource Body from Client
        const data = Object.assign({ id: findAllUsers.users.length + 1 }, req.body); // Object 
        // Step-03 Push "data" into "users"
        findAllUsers.users.push(data);
        // Step-04 Save "users" into "db.json"
        (0, fs_1.write)(findAllUsers);
        // Step-05 Sending Response to Client
        res.send({
            error: false,
            message: 'Create User Success!',
            data: null
        });
    }
    catch (error) {
        console.log(error);
    }
});
// PUT DATA
app.put('/users/:id', (req, res) => {
    try {
        // Step-01 Reading "db.json"
        const findAllUsers = (0, fs_1.read)();
        // Step-02 Get Data from "req.body"
        const { id } = req.params;
        const data = req.body; // Object 
        // Step-03 Manipulate Data
        // findAllUsers.users = [{0}, {1}]
        findAllUsers.users.forEach((item, index) => {
            // {id, username, email, password}
            if (item.id === Number(id)) {
                findAllUsers.users[index] = Object.assign(Object.assign({}, data), { id: item.id });
            }
        });
        // Step-04 Save Data into "db.json"
        (0, fs_1.write)(findAllUsers);
        // Step-05 Sending Response to Client
        res.send({
            error: false,
            message: 'Update User Success!',
            data: null
        });
    }
    catch (error) {
    }
});
app.delete('/users/:id', (req, res) => {
    try {
        // Step-01 Reading "db.json"
        const findAllUsers = (0, fs_1.read)();
        // Step-02 Get Data from "req.body"
        const { id } = req.params;
        // Step-03 Manipulate Data
        // findAllUsers.users = [{0}, {1}]
        findAllUsers.users.forEach((item, index) => {
            if (item.id === Number(id))
                findAllUsers.users.splice(index, 1);
        });
        // Step-04 Save Data into "db.json"
        (0, fs_1.write)(findAllUsers);
        // Step-05 Sending Response to Client
        res.send({
            error: false,
            message: 'Update User Success!',
            data: null
        });
    }
    catch (error) {
    }
});
app.get('/login', (req, res) => {
    try {
        // Step-01 
        const findAllUsers = (0, fs_1.read)();
        // Step-02
        console.log(req.query.email);
        console.log(req.query.password);
        const { email, password } = req.query;
        // Step-03
        let dataLogin = null;
        findAllUsers.users.forEach((item, index) => {
            if (item.email === email && item.password === password) {
                dataLogin = { id: item.id, email: item.email, username: item.username };
            }
        });
        // Step-04
        if (dataLogin === null)
            throw { status: 401, message: 'Login Failed' };
        res.status(200).send({
            error: false,
            message: 'Login Success',
            data: dataLogin
        });
    }
    catch (error) {
        res.status(error.status || 500).send({
            error: true,
            message: error.message || 'Something Went Wrong!',
            data: null
        });
    }
});
app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`);
});
// Exercise
// Buatlah endpoint login, dengan ketentuan
//      - Method    : GET
//      - Login By  : Email/Username & Password
