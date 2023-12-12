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
    res.send('<h1>Welcome to Tracker Expenses API</h1>');
});
// /expenses GET
// /expenses/:id GET
// /expenses POST
// /expenses/:id PUT
// /expenses/:id DELETE
app.get('/expenses-date-range', (req, res) => {
    try {
        const { startdate, enddate } = req.query;
        const findAllExpenses = (0, fs_1.read)();
        console.log(findAllExpenses);
        let totalExpenses = 0;
        findAllExpenses.expenses.forEach((item, index) => {
            if (item.date >= startdate && item.date <= enddate)
                totalExpenses += item.ammount;
        });
        res.status(200).send({
            error: false,
            message: 'Get Expenses by Date Range Success!',
            data: totalExpenses
        });
    }
    catch (error) {
    }
});
app.get('/expenses-category/:categoryId', (req, res) => {
    try {
        const { categoryId } = req.params;
        const findAllExpenses = (0, fs_1.read)();
        let totalExpenses = 0;
        findAllExpenses.expenses.forEach((item, index) => {
            if (item.categoryId === Number(categoryId))
                totalExpenses += item.ammount;
        });
        res.status(200).send({
            error: false,
            message: 'Get Expenses by Date Range Success!',
            data: totalExpenses
        });
    }
    catch (error) {
    }
});
app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`);
});
// Exercise
// Buatlah endpoint login, dengan ketentuan
//      - Method    : GET
//      - Login By  : Email/Username & Password
