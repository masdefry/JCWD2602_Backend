import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../lib/JWT';

export const tokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: any = req.headers.authorization;

    const decodedPayload: any = await jwtVerify(token);

    (req as any).decodedPayload = decodedPayload;

    if (decodedPayload.role !== 'ADMIN') throw { message: 'Access Denied' };

    next();
  } catch (error: any) {
    res.status(400).send({
      error: true,
      message: error.message,
      data: null,
    });
  }
};
