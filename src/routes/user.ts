import { UserController } from "@/controllers/userController";
import { isAuthorized } from "@/middlewares/authorizedHandler";
import { upload } from "@/middlewares/multerHandler";
import express from "express";

const userRouter = express.Router();

userRouter.get("/profile", isAuthorized, UserController.getProfile);

userRouter.put(
  "/profile",
  isAuthorized,
  upload.single("avatar"),
  UserController.updateProfile
);

export default userRouter;
