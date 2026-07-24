import {prismaClient} from "../config/database"
import { createUserDto, updateUserDto } from "../dto/user-dto";

export async function getAll(){
const users = prismaClient.user.findMany();

return users;
}

export async function getById(id:number){
const user = prismaClient.user.findUnique({
    where:{
        id
    }
})
return user
}

export async function findByEmail(email:string){
    const user = prismaClient.user.findUnique({
        where:{
            email
        }
    })
    return user
}

export async function create(data:createUserDto){
    const user = await prismaClient.user.create({
        data
    })
    return user
}

export async function update(id:number,data:updateUserDto){
    const user = await prismaClient.user.update({
        where:{
            id
        },
        data
    })
    return user
}

export async function remove(id:number){
    const user = await prismaClient.user.delete({
        where:{
            id
        }
    })
    return user
}
