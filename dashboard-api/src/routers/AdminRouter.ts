import { Router } from "express";

// Define Variable
const route = Router()

// Import Admin Controller
import * as AdminController from './../controllers/AdminController';
import { tokenVerify } from "../middleware/TokenVerify";

route.post('/', AdminController.register)
route.post('/login', AdminController.login)
route.post('/verified', tokenVerify, AdminController.verifiedAccount)

export default route