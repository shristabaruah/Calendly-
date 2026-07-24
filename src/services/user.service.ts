import { createUserDto, updateUserDto } from "../dto/user-dto";
import { create, findByEmail, getAll, getById, remove, update } from "../repositories/user.repositories";
import { conflictError, notFound } from "../utils/api-error";

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

export async function createUser(data:createUserDto){
    const existingUser = await findByEmail(data.email)
    if(existingUser){
        throw conflictError("user already exists")
    }
    return create(data)

}

export async function updateUser(id:number,data:updateUserDto){
    const existingUser = await getById(id)
    if(!existingUser){
        throw notFound("user not found")
    }
    if(data.email){
        const userWithEmail = await findByEmail(data.email)
        if(userWithEmail && userWithEmail.id!==id){
            throw conflictError("user already exists")
        }
    }
    return update(id,data)
}

export async function deleteUser(id:number){
    const existingUser = await getById(id)
    if(!existingUser){
        throw notFound("user not found")
    }
    return remove(id)
}