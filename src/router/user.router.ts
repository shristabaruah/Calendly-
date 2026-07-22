import { Router } from "express";
import { findAllUser, getById } from "../controllers/user.controller";

export const userRouter:Router = Router();

userRouter.get("/",findAllUser);
userRouter.get("/:id",getById);