// Handle Request & Response
import {Request, Response, NextFunction} from 'express';

import prisma from '../connection';

import { jwtCreate } from '../lib/JWT';

export const create = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {name, price, description, stock} = req.body
        console.log('Controller')
    } catch (error) {
        
    }
}


