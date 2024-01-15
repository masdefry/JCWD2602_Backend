import express, { Router } from "express";
import path from 'path';

// Define Variable
const route = Router()
// Body Parser
route.use(express.json())

route.use('*/image',express.static('public/image'))
// route.use('*/image',express.static('public/image'))

// Import All Router
import AdminRouter from './AdminRouter';
import ProductRouter from './ProductRouter';
import exp from "constants";

route.use('/admin', AdminRouter)
route.use('/product', ProductRouter)

export default route