import { responseHandler } from "@/middlewares/responseHandler";
import { NotFoundException } from "@/middlewares/throwError";
import { User } from "@/models/User";
import { firebaseStorage } from "@/services/firebaseStorage";
import { NextFunction, Request, Response } from "express";

export const UserController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query["userId"];
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw NotFoundException();
      }
      responseHandler(res, {
        item: user,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query["userId"];
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw NotFoundException();
      }
      const { fullName } = req.body;
      const file = req.file;
      if (fullName) user.fullName = fullName;
      if (file) {
        const url = await firebaseStorage.uploadFile(file);
        user.avatar = url;
      }
      await user.save();
      responseHandler(res, {
        item: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
