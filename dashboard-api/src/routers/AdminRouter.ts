import { Router } from "express";

// Define Variable
const route = Router()

// Import Admin Controller
import * as AdminController from './../controllers/AdminController';

route.post('/', AdminController.register)
route.post('/login', AdminController.login)

export default route