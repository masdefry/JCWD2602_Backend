"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs")); // FS: File System ---> Untuk Reading File
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
        const { users } = JSON.parse(fs_1.default.readFileSync('./database/db.json', 'utf-8'));
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
        const findAllUsers = JSON.parse(fs_1.default.readFileSync('./database/db.json', 'utf-8')); // Array of Object
        // findAllUsers = { users: [{}] } ---> findAllUsers.users ---> [{}]
        // Step-02 Get Resource Body from Client
        const data = Object.assign({ id: findAllUsers.users.length + 1 }, req.body); // Object 
        // Step-03 Push "data" into "users"
        findAllUsers.users.push(data);
        // Step-04 Save "users" into "db.json"
        fs_1.default.writeFileSync('./database/db.json', JSON.stringify(findAllUsers));
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
app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`);
});
