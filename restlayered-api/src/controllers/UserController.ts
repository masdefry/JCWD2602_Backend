// Handle Request & Response

import {Request, Response} from 'express';

import prisma from '../connection';

export const login = async(req: Request, res: Response): Promise<void> => {
    try {
        const findUser = await prisma.users.findMany()
        
        res.status(200).send({
            error: false, 
            message: 'Get Users Success!', 
            data: findUser
        })
    } catch (error) {
        console.log(error)
    }
}
