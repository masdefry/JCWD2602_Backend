"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadValidator = void 0;
const Multer_1 = require("../lib/Multer");
const fs_1 = __importDefault(require("fs"));
const UploadValidator = (req, res, next) => {
    const uploadResult = Multer_1.upload.fields([{ name: 'bebas', maxCount: 3 }]);
    uploadResult(req, res, (err) => {
        try {
            if (err)
                throw err;
            let isError = '';
            if (req.files) {
                const filesArray = Array.isArray(req.files) ? req.files : req.files['bebas'];
                if (Array.isArray(filesArray)) {
                    filesArray.forEach((item) => {
                        if (item.size > 5000000000000) {
                            isError += `${item.originalname} Size too Large. Maximum Size 5Kb`;
                        }
                    });
                }
            }
            if (isError)
                throw { message: isError, images: req.files.bebas };
            next();
        }
        catch (error) {
            if (error.images) {
                error.images.forEach((item) => {
                    fs_1.default.rmSync(item.path);
                });
            }
            res.status(500).send({
                error: true,
                message: `Upload Failed! ${error.message}`,
                data: null
            });
        }
    });
};
exports.UploadValidator = UploadValidator;
