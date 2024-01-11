"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const defaultPath = 'public';
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const childDirectory = `${file.mimetype.split('/')[0]}`;
        const isDirectoryExist = fs_1.default.existsSync(`${defaultPath}/${childDirectory}`); // 'public/images' OR 'public/document' dsb
        if (isDirectoryExist === false)
            fs_1.default.mkdirSync(`${defaultPath}/${childDirectory}`, { recursive: true });
        cb(null, `${defaultPath}/${childDirectory}`);
    },
    filename: function (req, file, cb) {
        let originalNameSplit = file.originalname.split('.');
        let formatFile = originalNameSplit[originalNameSplit.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + `.${formatFile}`;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const fileFilter = (req, file, cb) => {
    const formatAccepted = ['png', 'jpg', 'jpeg', 'svg', 'webp', 'pdf', 'xlsx', 'docx', 'pptx'];
    let originalNameSplit = file.originalname.split('.');
    if (formatAccepted.includes(originalNameSplit[originalNameSplit.length - 1])) {
        cb(null, true);
    }
    else {
        cb(new Error('File Format Not Accepted!'));
    }
};
exports.upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
