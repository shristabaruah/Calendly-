import {z} from "zod";

 export const createUserSchema = z.object({
    email: z.email(),
    name:z.string().min(1,"name is too short").max(100,"name is too long"),

 })
 export type createUserDto = z.infer<typeof createUserSchema>

 export const updateUserSchema = createUserSchema.partial()
 export type updateUserDto = z.infer<typeof updateUserSchema>