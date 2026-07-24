import { CreateEventTypeDto, UpdateEventTypeDto } from "../dto/event-type-dto";
import { prismaClient } from "../config/database";
import { notFound } from "../utils/api-error";

export async function findByHostId(hostId:number){
    const eventTypes= await prismaClient.eventType.findMany({
        where:{
            hostId
        }
    })
    return eventTypes
}

export async function getById(id:number){
    const eventType = await prismaClient.eventType.findUnique({
        where:{
            id
        }
    })
    return eventType
}

export async function create(hostId:number,data:CreateEventTypeDto & {slug:string}){
    const eventType = await prismaClient.eventType.create({
        data:{
            ...data,
            hostId
        }
    })
    return eventType
}

export async function update(id:number,data:UpdateEventTypeDto){
    const eventType = await prismaClient.eventType.update({
        where:{
            id
        },
        data
    })
    return eventType
}

export async function remove(id:number){
    const eventType = await prismaClient.eventType.delete({
        where:{
            id
        }
    })
    return eventType
}

export async function findBySlugAndHost(slug:string,hostId:number){
    const eventType = await prismaClient.eventType.findFirst({
        where:{
           slug,
           hostId
        }
    })
    return eventType
}

export async function findActiveByHostIdAndEventSlug(hostId:number,slug:string){
    const host = await prismaClient.user.findUnique({
        where:{
            id:hostId
        }
    })
    if(!host){
        throw notFound("Host not found")
    }
    const eventType = await prismaClient.eventType.findFirst({
        where:{
            hostId,
            slug,
            isActive:true
        },
    })
    return eventType;
       
}

export async function slugExistForHost(slug:string,hostId:number){
    const existing = await prismaClient.eventType.findFirst({
        where:{
           slug,
           hostId
        }
    })
    return existing !== null;
}