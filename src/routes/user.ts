import { UserController } from "@/controllers/userController";
import { isAuthorized } from "@/middlewares/authorizedHandler";
import express from "express";

const userRouter = express.Router();

userRouter.get("/profile", isAuthorized, UserController.getProfile);

export default userRouter;
