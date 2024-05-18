import { UserController } from "@/controllers/userController";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", UserController.users);

export default userRouter;
