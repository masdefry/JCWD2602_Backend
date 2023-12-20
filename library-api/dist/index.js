"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// 1.2. 
app.use(express_1.default.json()); // Body Parser ---> Untuk Mengambil Data Body from Client
const port = 5000;
// IMPORT DATABASE SETUP
const connection_1 = __importDefault(require("./connection"));
const util_1 = __importDefault(require("util"));
const query = util_1.default.promisify(connection_1.default.query).bind(connection_1.default);
app.get('/', (req, res) => {
    // Req: Digunakan Untuk Mengambil Resource dari Client
    // Res: Digunakan Untuk Mengirim Response Menuju Client
    res.send('<h1>Welcome to Tracker Expenses API</h1>');
});
app.get('/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.query;
        const findAdmin = yield query(`SELECT * FROM admins a
        JOIN shift_time st ON a.shift_time_id = st.id WHERE username = ? AND password = ?`, [username, password]);
        if (findAdmin.length === 0)
            throw { status: 300, message: 'Login Failed!' };
        const loginTime = (0, moment_1.default)(new Date(), 'HH:mm:ss');
        const clockIn = (0, moment_1.default)(findAdmin[0].clock_in, 'HH:mm:ss');
        const clockOut = (0, moment_1.default)(findAdmin[0].clock_out, 'HH:mm:ss');
        if (loginTime.isBetween(clockIn, clockOut) === false)
            throw { status: 400, message: 'Login Failed! Not in Shift Time!' };
        res.status(200).send({
            error: false,
            message: 'Login Success',
            data: null
        });
    }
    catch (error) {
        res.status(error.status || 500).send({
            error: true,
            message: error.message,
            data: null
        });
    }
}));
app.post('/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield query('START TRANSACTION');
        const { title, publisher, publish_year, branch_id, category_id } = req.body;
        const { insertId } = yield query(`INSERT INTO books SET ?`, {
            title, publisher, publish_year
        });
        branch_id.forEach((item) => {
            item.unshift(insertId);
            item.push(0);
        });
        category_id.forEach((item) => {
            item.push(insertId);
        });
        yield query(`INSERT INTO books_has_branch(books_id, branch_id, stocks, total_borrowed) VALUES ?`, [branch_id]);
        yield query(`INSERT INTO category_has_books(category_id, books_id) VALUES ?`, [category_id]);
        yield query('COMMIT');
        res.status(201).send({
            error: false,
            message: 'Create New Book Success!',
            data: null
        });
    }
    catch (error) {
        yield query('ROLLBACK');
        console.log(error);
    }
}));
app.get('/category-branch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findCategories = yield query('SELECT * FROM categories');
        const findBranch = yield query('SELECT id, name FROM branches');
        res.status(200).send({
            error: false,
            message: 'Get Categories & Branches Success!',
            data: {
                findCategories,
                findBranch
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}));
app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`);
});
