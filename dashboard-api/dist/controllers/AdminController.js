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
exports.login = exports.register = void 0;
const connection_1 = __importDefault(require("../connection"));
const HashPassword_1 = require("../lib/HashPassword");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password)
            throw { message: 'Data Not Complete!' };
        const hashedPassword = yield (0, HashPassword_1.hashPassword)(password);
        yield connection_1.default.admins.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });
        res.status(200).send({
            error: false,
            message: 'Register Success',
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usernameOrEmail, password } = req.body;
        const admin = yield connection_1.default.admins.findFirst({
            where: {
                OR: [
                    { email: usernameOrEmail },
                    { username: usernameOrEmail }
                ]
            }
        });
        if (admin === null)
            throw { message: 'Username or Email Not Found' };
        const isComapre = yield (0, HashPassword_1.hashMatch)(password, admin.password);
        if (isComapre === false)
            throw { message: 'Password Doesnt Match' };
        res.status(200).send({
            error: false,
            message: 'Login Success',
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
