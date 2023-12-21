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
exports.queryFindBranchAndCategory = exports.queryCreateNewBook = exports.queryLogin = void 0;
// IMPORT DATABASE SETUP
const connection_1 = __importDefault(require("./../connection"));
const util_1 = __importDefault(require("util"));
const query = util_1.default.promisify(connection_1.default.query).bind(connection_1.default);
const queryLogin = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const findAdmin = yield query(`SELECT * FROM admins a
    JOIN shift_time st ON a.shift_time_id = st.id WHERE username = ? AND password = ?`, [username, password]);
    return findAdmin;
});
exports.queryLogin = queryLogin;
const queryCreateNewBook = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.queryCreateNewBook = queryCreateNewBook;
const queryFindBranchAndCategory = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.queryFindBranchAndCategory = queryFindBranchAndCategory;
