import { Router } from "express";

// Define Variable
const route = Router()

// Import Product Controller
import * as ProductController from './../controllers/ProductController';

// Import Middleware
import { tokenVerify } from "../middleware/TokenVerify";
import { UploadValidator } from "../middleware/UploadValidator";

route.post('/', UploadValidator, ProductController.create)

export default route