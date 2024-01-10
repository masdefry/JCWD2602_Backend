import express, { Router } from "express";

// Define Variable
const route = Router()
// Body Parser
route.use(express.json())

// Import All Router
import AdminRouter from './AdminRouter';
import ProductRouter from './ProductRouter';

route.use('/admin', AdminRouter)
route.use('/product', ProductRouter)

export default route