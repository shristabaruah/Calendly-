import { Response } from "express"
interface SuccessPayload<T> {
    success:true,
    data:T,
    message?:string}


    export function sendSuccess<T>(res:Response,data:T,message?:string,statusCode=200):void
    {
        const payload:SuccessPayload<T>={
            success:true,
            data,
            
        } 
        if(message){
            payload.message=message;
        }
        res.status(statusCode).json(payload)
    }