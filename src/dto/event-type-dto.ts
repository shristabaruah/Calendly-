import z from "zod";

export const createEventTypeSchema = z.object({
    title:z.string().min(1,"title is too short").max(200,"title is too long"),
    durationInMinutes:z.number().int().positive().min(15,"durationInMinutes is too short").max(120,"durationInMinutes is too long").default(30),
    description:z.string().max(1000,"description is too long").optional(), 
    isActive:z.boolean().default(true),
    locationType:z.enum(["online","in-person"]).default("online"),
    locationValue:z.string().optional(),
    bufferBeforeMinutes:z.number().min(0).max(120).default(0),
    bufferAfterMinutes:z.number().min(0).max(120).default(0),
    hostId:z.number().int().positive(),
    slug:z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional()
})

export type CreateEventTypeDto = z.infer<typeof createEventTypeSchema>

export const updateEventTypeSchema = createEventTypeSchema.partial()
export type UpdateEventTypeDto = z.infer<typeof updateEventTypeSchema>