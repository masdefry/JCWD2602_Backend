"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
const fs_1 = __importDefault(require("fs")); // FS: File System ---> Untuk Reading File
const read = () => {
    return JSON.parse(fs_1.default.readFileSync('./database/db.json', 'utf-8')); // Array of Object
};
exports.read = read;
const write = (findAllUsers) => {
    fs_1.default.writeFileSync('./database/db.json', JSON.stringify(findAllUsers));
};
exports.write = write;
