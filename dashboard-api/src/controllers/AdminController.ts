// Handle Request & Response
import {Request, Response, NextFunction} from 'express';

import prisma from '../connection';

import { hashPassword, hashMatch } from '../lib/HashPassword';

export const register = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, username, password} = req.body

        if(!email || !username || !password) throw {message: 'Data Not Complete!'}

        const hashedPassword: string = await hashPassword(password)
        
        await prisma.admins.create({
            data: {
                email, 
                username, 
                password: hashedPassword
            }
        })

        res.status(200).send({
            error: false, 
            message: 'Register Success',
            data: null
        })
    } catch (error) {
        next(error)
    }
}

export const login = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {usernameOrEmail, password} = req.body
        
        const admin = await prisma.admins.findFirst({
            where: {
                OR: [
                    {email: usernameOrEmail}, 
                    {username: usernameOrEmail}
                ]
            }
        })
        
        if(admin === null) throw {message: 'Username or Email Not Found'}

        const isComapre = await hashMatch(password, admin.password)
        
        if(isComapre === false) throw {message: 'Password Doesnt Match'}

        res.status(200).send({
            error: false, 
            message: 'Login Success', 
            data: null
        })
    } catch (error) {
        next(error)
    }
}