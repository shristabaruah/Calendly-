import {Request ,Response} from 'express';
import { findAllUsers as findAllUserService , findById as findByIdService} from '../services/user.service';

export async function findAllUser(_req:Request,res:Response){
const response  = await findAllUserService();
res.json(response)
}

export async function getById(req:Request,res:Response){
    const {id} = req.params;
const response  = await findByIdService(Number(id));
res.json(response)
}