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
exports.verifiedAccount = exports.login = exports.register = void 0;
const connection_1 = __importDefault(require("../connection"));
const HashPassword_1 = require("../lib/HashPassword");
const JWT_1 = require("../lib/JWT");
const TransportperMailer_1 = require("../helpers/TransportperMailer");
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password, role } = req.body;
        if (!email || !username || !password || !role)
            throw { message: 'Data Not Complete!' };
        const hashedPassword = yield (0, HashPassword_1.hashPassword)(password);
        const createUser = yield connection_1.default.admins.create({
            data: {
                email,
                username,
                password: hashedPassword,
                role
            }
        });
        const token = yield (0, JWT_1.jwtCreate)({ id: createUser.id, role: createUser.role });
        const template = fs_1.default.readFileSync('src/Template.html', 'utf-8');
        let compiledTemplate = yield handlebars_1.default.compile(template);
        compiledTemplate = compiledTemplate({ username, token });
        yield TransportperMailer_1.transporterNodemailer.sendMail({
            from: 'masdefry20@gmail.com',
            to: email,
            subject: 'Welcome!',
            html: compiledTemplate
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
        const token = yield (0, JWT_1.jwtCreate)({ id: admin.id, role: admin.role });
        res.status(200).send({
            error: false,
            message: 'Login Success',
            data: {
                username: admin.username,
                token
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const verifiedAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.admins.update({
            where: {
                id: req.body.id
            },
            data: {
                verified: 1
            }
        });
    }
    catch (error) {
    }
});
exports.verifiedAccount = verifiedAccount;
