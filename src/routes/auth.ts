import { AuthController } from "@/controllers/authController";
import express from "express";

const authRouter = express.Router();

authRouter.post("/sign-up", AuthController.signup);

authRouter.post("/login", AuthController.login);

export default authRouter;
