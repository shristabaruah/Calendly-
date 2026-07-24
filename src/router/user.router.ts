import { Router } from "express";
import { createUser, findAllUser, getById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../dto/user-dto.js";

export const userRouter:Router = Router();

userRouter.get("/",findAllUser);
userRouter.get("/:id",getById);
userRouter.post("/",validate(createUserSchema),createUser);
userRouter.patch("/:id",validate(updateUserSchema),updateUser);
userRouter.delete("/:id",deleteUser);