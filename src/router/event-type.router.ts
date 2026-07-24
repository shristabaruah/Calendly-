import { Router } from "express";
import { list, getById, create, update, remove } from "../controllers/event-type.controller.js";
import { validate } from "../middlewares/validate.js";
import { requireUserId } from "../middlewares/require-user-id.js";
import { createEventTypeSchema, updateEventTypeSchema } from "../dto/event-type-dto.js";

export const eventTypeRouter:Router = Router();

eventTypeRouter.use(requireUserId);

eventTypeRouter.get("/",list);
eventTypeRouter.get("/:id",getById);
eventTypeRouter.post("/",validate(createEventTypeSchema),create);
eventTypeRouter.patch("/:id",validate(updateEventTypeSchema),update);
eventTypeRouter.delete("/:id",remove);
