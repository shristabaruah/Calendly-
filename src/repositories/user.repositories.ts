import {prismaClient} from "../config/database"

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
