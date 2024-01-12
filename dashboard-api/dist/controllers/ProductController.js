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
exports.deleteProduct = exports.create = void 0;
const connection_1 = __importDefault(require("../connection"));
const fs_1 = __importDefault(require("fs"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield connection_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, price, description, stock } = JSON.parse(req.body.bebas1);
            const { id } = yield tx.products.create({
                data: {
                    name, price, description, stock
                }
            });
            const createImages = [];
            req.files.bebas.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                createImages.push({ url: item.filename, products_id: id });
            }));
            yield tx.productImages.createMany({
                data: createImages
            });
        }));
        res.status(201).send({
            error: false,
            message: 'Create Product Success!',
            data: null
        });
    }
    catch (error) {
        (_a = req.files) === null || _a === void 0 ? void 0 : _a.bebas.forEach((item) => {
            console.log(item);
            fs_1.default.rmSync(item.path);
        });
        console.log(error);
    }
    finally {
        connection_1.default.$disconnect();
    }
});
exports.create = create;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Get Id Product from Req
        const { productId } = req.params;
        console.log(productId);
        let imagesToDelete;
        yield connection_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // 2.1. Before Delete Images, Get Image Url to Delete Image File from Public
            imagesToDelete = yield tx.productImages.findMany({
                where: {
                    products_id: {
                        contains: productId
                    }
                }
            });
            // 2.2. Delete Product_Images
            yield tx.productImages.deleteMany({
                where: {
                    products_id: productId
                }
            });
            // 3. Delete Products
            yield tx.products.delete({
                where: {
                    id: productId
                }
            });
        }));
        // 4. Delete Images from public/images
        imagesToDelete.forEach((item) => {
            fs_1.default.rmSync(`public/image/${item.url}`);
        });
        res.status(200).send({
            error: false,
            message: 'Delete Product Success!',
            data: null
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProduct = deleteProduct;
