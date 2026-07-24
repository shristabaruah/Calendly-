import {  ZodSchema } from "zod";
import { NextFunction,Request,Response } from "express";
import { badRequest } from "../utils/api-error";

export const validate = (schema:ZodSchema)=>(req:Request,_res:Response,next:NextFunction)=>{

const result=schema.safeParse(req.body);
if(!result.success){
    throw badRequest('Validation failed',result.error.issues)
}

req.body=result.data;
next();
}

