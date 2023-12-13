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
app.get('/admin/transaction', (req, res) => {
    try {
        // Step-01 Get Data from "db.json"
        const findData = (0, fs_1.read)();
        // Step-02 Get "startdate" & "enddate"
        const { startdate, enddate } = req.query;
        // Step-03 Manipulate Data
        const findTransactionLists = findData.transactions.filter((item, index) => {
            return (new Date(item.createdAt) >= new Date(startdate) && new Date(item.createdAt) <= new Date(enddate));
        });
        findTransactionLists.forEach((item, index) => {
            findData.users.forEach((usersItem, idx) => {
                if (item.usersId === usersItem.id) {
                    findTransactionLists[index].usersId = usersItem;
                }
            });
            findData.products.forEach((productsItem, idx) => {
                if (item.productsId === productsItem.id) {
                    findTransactionLists[index].productsId = productsItem;
                }
            });
        });
        // Step-04 
        res.status(200).send({
            error: false,
            message: 'Get Transaction List Success!',
            data: findTransactionLists
        });
    }
    catch (error) {
    }
});
app.get('/admin/income', (req, res) => {
    try {
        // Step-01 Get Data from "db.json"
        const findData = (0, fs_1.read)();
        const { month, year } = req.query;
        let totalIncome = 0;
        findData.transactions.forEach((item, index) => {
            if (month === item.createdAt.split('-')[1])
                totalIncome += item.total;
            if (year === item.createdAt.split('-')[0])
                totalIncome += item.total;
        });
        res.status(200).send({
            error: false,
            message: 'Get Total Income Success',
            data: totalIncome
        });
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`);
});
