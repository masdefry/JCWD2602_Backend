import express, { Router } from "express";

// Define Variable
const route = Router()
// Body Parser
route.use(express.json())

// Import All Router
import AdminRouter from './AdminRouter';

route.use('/admin', AdminRouter)

export default route