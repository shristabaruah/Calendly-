import { Request, Response } from "express";
import { listEventTypes as listEventTypesService, createEventType as createEventTypeService, updateEventType as updateEventTypeService, removeEvenType as removeEvenTypeService, getEventTypeById as getEventTypeByIdService, getEventTypePublic as getEventTypePublicService } from "../services/event-types.service";
import { sendSuccess } from "../utils/api-response";

export async function list(req:Request,res:Response){
    const response = await listEventTypesService(Number(req.userId));
    sendSuccess(res,response)
}

export async function getById(req:Request,res:Response){
    const {id} = req.params;
    const response = await getEventTypeByIdService(Number(req.userId),Number(id));
    sendSuccess(res,response)
}

export async function create(req:Request,res:Response){
    const response = await createEventTypeService(Number(req.userId),req.body);
    sendSuccess(res,response,"event type created successfully",201)
}

export async function update(req:Request,res:Response){
    const {id} = req.params;
    const response = await updateEventTypeService(Number(req.userId),Number(id),req.body);
    sendSuccess(res,response,"event type updated successfully")
}

export async function remove(req:Request,res:Response){
    const {id} = req.params;
    const response = await removeEvenTypeService(Number(req.userId),Number(id));
    sendSuccess(res,response,"event type deleted successfully")
}

export async function getPublicEventType(req:Request,res:Response){
    const {userId,slug} = req.params;
    const response = await getEventTypePublicService(Number(userId),String(slug));
    sendSuccess(res,response)
}
