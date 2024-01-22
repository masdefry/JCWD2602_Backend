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
exports.findProducts = exports.deleteProduct = exports.create = void 0;
const connection_1 = __importDefault(require("../connection"));
const fs_1 = __importDefault(require("fs"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedPayload = req.decodedPayload;
        console.log(decodedPayload);
        yield connection_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, price, description, stock } = JSON.parse(req.body.bebas1);
            const { id } = yield tx.products.create({
                data: {
                    name, price, description, stock
                }
            });
            const createImages = [];
            if (req.files) {
                let filesArray = Array.isArray(req.files) ? req.files : req.files['bebas'];
                filesArray.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                    createImages.push({ url: item.filename, products_id: id });
                }));
            }
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
        if (req.files) {
            let filesArray = Array.isArray(req.files) ? req.files : req.files['bebas'];
            filesArray.forEach((item) => {
                fs_1.default.rmSync(item.path);
            });
        }
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
const findProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.query;
        const limit = 3;
        const offset = (page - 1) * limit;
        const totalProducts = yield connection_1.default.products.count();
        const products = yield connection_1.default.products.findMany({
            skip: offset,
            take: limit,
            include: {
                ProductImages: true
            }
        });
        const totalPage = Math.ceil(totalProducts / limit);
        const arrPage = [];
        for (let i = 1; i <= totalPage; i++) {
            arrPage.push(i);
        }
        res.status(200).send({
            error: false,
            message: 'Get Product Success!',
            data: {
                totalPage,
                arrPage,
                products
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.findProducts = findProducts;
