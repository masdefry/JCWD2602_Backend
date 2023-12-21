import express, {Router} from 'express';

// Define Router
const bebas = Router()
bebas.use(express.json()) // Body Parser

// Import Admin Router
import AdminRouter from './AdminRouter';

bebas.use('/admin', AdminRouter)

export default bebas