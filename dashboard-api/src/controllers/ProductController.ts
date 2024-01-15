// Handle Request & Response
import {Request, Response, NextFunction} from 'express';

import prisma from '../connection';
import { jwtCreate } from '../lib/JWT';
import fs from 'fs';


export const create = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    
        try {
            await prisma.$transaction(async(tx) => {
                const {name, price, description, stock} = JSON.parse(req.body.bebas1)

                const {id} = await tx.products.create({
                    data: {
                        name, price, description, stock
                    }
                })

                const createImages: any = []
                req.files.bebas.forEach(async(item: any) => {
                    createImages.push({url: item.filename, products_id: id})
                })
                
                await tx.productImages.createMany({
                    data: createImages
                })
            })

            res.status(201).send({
                error: false, 
                message: 'Create Product Success!',
                data: null
            })
        } catch (error) {
            req.files?.bebas.forEach((item: any) => {
                console.log(item)
                fs.rmSync(item.path)
            })
            console.log(error)
        } finally {
            prisma.$disconnect()
        }
}

export const deleteProduct = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // 1. Get Id Product from Req
        const {productId} = req.params
        console.log(productId)

        let imagesToDelete: any
        await prisma.$transaction(async(tx) => {
            // 2.1. Before Delete Images, Get Image Url to Delete Image File from Public
            imagesToDelete = await tx.productImages.findMany({
                where: {
                    products_id: {
                        contains: productId
                    }
                }
            })
            // 2.2. Delete Product_Images
            await tx.productImages.deleteMany({
                where: {
                    products_id: productId
                }
            })

            // 3. Delete Products
            await tx.products.delete({
                where: {
                    id: productId
                }
            })
        })

        // 4. Delete Images from public/images
        imagesToDelete.forEach((item: any) => {
            fs.rmSync(`public/image/${item.url}`)
        })

        res.status(200).send({
            error: false, 
            message: 'Delete Product Success!', 
            data: null
        })
    } catch (error) {
        console.log(error)
    }
}

export const findProducts = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await prisma.products.findMany({
            include: {
                ProductImages: true
            }
        })

        res.status(200).send({
            error: false, 
            message: 'Get Product Success!', 
            data: products
        })
    } catch (error) {
        console.log(error)
    }
}