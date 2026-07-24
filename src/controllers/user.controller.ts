import {Request ,Response} from 'express';
import { createUser as createUserService, findAllUsers as findAllUserService , findById as findByIdService, updateUser as updateUserService, deleteUser as deleteUserService} from '../services/user.service';
import { sendSuccess } from '../utils/api-response';

export async function findAllUser(_req:Request,res:Response){
const response  = await findAllUserService();
sendSuccess(res,response)
}

export async function getById(req:Request,res:Response){
    const {id} = req.params;
const response  = await findByIdService(Number(id));
sendSuccess(res,response)
}

export async function createUser(req:Request,res:Response){
    const newUser = req.body;
    const response = await createUserService(newUser);
    sendSuccess(res,response,"user created successfully",201)

}

export async function updateUser(req:Request,res:Response){
    const {id} = req.params;
    const response = await updateUserService(Number(id),req.body);
    sendSuccess(res,response,"user updated successfully")
}

export async function deleteUser(req:Request,res:Response){
    const {id} = req.params;
    const response = await deleteUserService(Number(id));
    sendSuccess(res,response,"user deleted successfully")
}