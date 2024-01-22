// Handle Request & Response
import {Request, Response, NextFunction} from 'express';

import prisma from '../connection';

import { hashPassword, hashMatch } from '../lib/HashPassword';
import { jwtCreate } from '../lib/JWT';
import { transporterNodemailer } from '../helpers/TransportperMailer';
import fs from 'fs';
import Handlebars from 'handlebars';
import { jwtVerify } from '../lib/JWT';

export const register = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, username, password, role} = req.body

        if(!email || !username || !password || !role) throw {message: 'Data Not Complete!'}

        const hashedPassword: string = await hashPassword(password)
        
        const createUser = await prisma.admins.create({
            data: {
                email, 
                username, 
                password: hashedPassword, 
                role
            }
        })

        const token = await jwtCreate({id: createUser.id, role: createUser.role})
      
        const template = fs.readFileSync('src/Template.html', 'utf-8');

        let compiledTemplate: any = await Handlebars.compile(template);
        compiledTemplate = compiledTemplate({username, token})

        await transporterNodemailer.sendMail({
            from: 'masdefry20@gmail.com', 
            to: email, 
            subject: 'Welcome!', 
            html: compiledTemplate
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
        console.log('>>>')
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
        
        const token = await jwtCreate({id: admin.id, role: admin.role})
    
        res.status(200).send({
            error: false, 
            message: 'Login Success', 
            data: {
                username: admin.username,
                token
            }
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const verifiedAccount = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await prisma.admins.update({
            where: {
                id: req.body.id
            }, 
            data: {
                verified: 1
            }
        })
    } catch (error) {
        
    }
}

