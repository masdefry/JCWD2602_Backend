import express, { Router } from "express";

// Define Variable
const route = Router()
// Body Parser
route.use(express.json())

// Import All Router
import UserRouter from './UserRouter';

route.use('/users', UserRouter)

export default route