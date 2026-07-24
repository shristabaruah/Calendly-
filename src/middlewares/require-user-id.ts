import { Request, Response, NextFunction } from "express";
import { unAuthorised } from "../utils/api-error";

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export function requireUserId(req:Request,_res:Response,next:NextFunction){
    const header = req.headers["x-user-id"];
    const rawUserId = Array.isArray(header) ? header[0] : header;

    if(!rawUserId){
        throw unAuthorised("user id header is required")
    }

    const userId = Number(rawUserId);
    if(Number.isNaN(userId)){
        throw unAuthorised("user id header is invalid")
    }

    req.userId = userId;
    next();
}
