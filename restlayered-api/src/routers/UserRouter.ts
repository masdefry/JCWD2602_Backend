import { Router } from "express";

// Define Variable
const route = Router()

// Import User Controller
import * as UserController from './../controllers/UserController';

route.get('/', UserController.login)

export default route