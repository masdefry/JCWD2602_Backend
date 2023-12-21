"use strict";
// Controller: Fungsinya Untuk Melakukan Req & Res
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.findBranchAndCategory = exports.createNewBook = exports.login = void 0;
const moment_1 = __importDefault(require("moment"));
// Import Service
const AdminService = __importStar(require("./../services/AdminService"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.query;
        const findAdmin = yield AdminService.queryLogin({ username, password });
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
});
exports.login = login;
const createNewBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.createNewBook = createNewBook;
const findBranchAndCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.findBranchAndCategory = findBranchAndCategory;
