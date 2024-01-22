import { Router } from "express";

// Define Variable
const route = Router()

// Import Product Controller
import * as ProductController from './../controllers/ProductController';

// Import Middleware
import { tokenVerify } from "../middleware/TokenVerify";
import { UploadValidator } from "../middleware/UploadValidator";

route.post('/', tokenVerify, UploadValidator, ProductController.create)
route.delete('/:productId', ProductController.deleteProduct)
route.get('/', ProductController.findProducts)

export default route