import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';
import { NODE_ENV } from '../config/env';
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        const body: Record<string, unknown> = {
            success: false,
            status: err.statusCode,
            message: err.message,

        }
        if (err.details) body.details = err.details;

        res.status(err.statusCode).json(body);
        return
    }
    console.log('[error]', err);
    const body: Record<string, unknown> = {
        success: false,
        message: "Something went wrong"
    }
     if (NODE_ENV === "development")
        body.details = err.stack;
    res.status(500).json(body);
   


}