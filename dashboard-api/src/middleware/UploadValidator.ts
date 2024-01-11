import { Request, Response, NextFunction } from "express";
import { upload } from "../lib/Multer";

import fs from 'fs';

export const UploadValidator = (req: Request, res: Response, next: NextFunction) => {
    const uploadResult = upload.fields([{name: 'bebas', maxCount: 3}])

    uploadResult(req, res, (err) => {
        try {
            if(err) throw err

            let isError = ''

            if (req.files) {
                const filesArray = Array.isArray(req.files) ? req.files : req.files['bebas'];
              
                if (Array.isArray(filesArray)) {
                  filesArray.forEach((item: Express.Multer.File) => {
                    console.log(item);
                    if (item.size > 5000) {
                      isError += `${item.originalname} Size too Large. Maximum Size 5Kb`;
                    }
                  });
                }
              }

            if(isError) throw {message: isError, images: req.files.bebas}
        } catch (error: any) {
            if(error.images){
              error.images.forEach((item: any) => {
                fs.rmSync(item.path)
              })
            }

            res.status(500).send({
                error: true, 
                message: `Upload Failed! ${error.message}`, 
                data: null
            })
        }
    })
}