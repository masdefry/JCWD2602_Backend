import { Request, Response, NextFunction } from "express";

import { jwtVerify } from "../lib/JWT";

interface IRequest extends Request {
    payload: any
}

export const tokenVerify = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get Token from Headers
        const token: any = req.headers.authorization
        console.log(token)
        const payload: any = await jwtVerify(token)
        
        req.body = payload
        
        if(payload.role !== 'ADMIN') throw {message: 'Access Denied'}

        next()
    } catch (error: any) {
        res.status(400).send({
            error: true, 
            message: error.message, 
            data: null
        })
    }
}