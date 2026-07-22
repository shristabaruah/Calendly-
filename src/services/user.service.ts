import { getAll, getById } from "../repositories/user.repositories";
import { notFound } from "../utils/api-error";

export async function findAllUsers(){
    const   users= await getAll()
    return users
}

export async function findById(id:number){
    const user = await getById(id)
    if(!user){
        throw notFound("user not found")
    }
    return user
}