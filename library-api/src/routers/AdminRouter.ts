import { Router } from "express";

// Define Router
const bebas = Router()

// Import Controller
import * as AdminController from './../controllers/AdminController';

bebas.get('/', AdminController.login)
bebas.post('/', AdminController.createNewBook)
bebas.get('/category-branch', AdminController.findBranchAndCategory)

export default bebas