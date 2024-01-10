import { Router } from "express";

// Define Variable
const route = Router()

// Import Product Controller
import * as ProductController from './../controllers/ProductController';

// Import Middleware
import { tokenVerify } from "../middleware/TokenVerify";

route.post('/', tokenVerify, ProductController.create)

export default route