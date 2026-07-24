import slug from "slug";
import { CreateEventTypeDto } from "../dto/event-type-dto";
import { create, findActiveByHostIdAndEventSlug, findByHostId, findBySlugAndHost, getById , remove, slugExistForHost } from "../repositories/event-type.repositories";
import { conflictError, forbiddenError, notFound } from "../utils/api-error";
import { getById as getUserById } from "../repositories/user.repositories";


export async function listEventTypes(hostId:number){
    const eventTypes = await findByHostId(hostId);
    return eventTypes;
}

export async function createEventType(hostId:number,data:CreateEventTypeDto){
    const slugPassed = data.slug ?? slug(data.title,{lower:true})
    if(!slugPassed){
        throw conflictError("failed to create slug")
    }

    const isSlugTaken = await slugExistForHost(slugPassed,hostId)
    if(isSlugTaken){
        throw conflictError("slug is already taken")
    }

    return create(hostId,{...data,slug:slugPassed})
}

export async function removeEvenType(hostId:number,id:number){
    const eventType = await getById(id)

    if(!eventType){
        throw notFound("event not found")
    }

    if(eventType.hostId !== hostId){
        throw forbiddenError("you dont have permission to delete this event")
    }

    return remove(id)

    
}

export async function getEventTypeById(hostId:number,id:number){
    const eventType = await getById(id)

    if(!eventType){
        throw notFound("event not found")
    }

    if(eventType.hostId !== hostId){
        throw forbiddenError("you dont have permission to access this event")
    }

    return eventType
}

export async function getEventTypePublic(hostId:number, eventSlug:string){
    const eventType = await findActiveByHostIdAndEventSlug(hostId,eventSlug)
    
    if(!eventType){
        throw notFound("event not found")
    }


    const host = await getUserById(hostId)
    
    if(!host){
        throw notFound("host not found")
    }
    
    return {
        eventType:{
            id: eventType.id,
            title:eventType.title,
            description: eventType.description,
            durationInMinutes: eventType.durationInMinutes,
            locationType: eventType.locationType
            
        },
        host:{
            name:host.name,
            email: host.email
        }
    }
}