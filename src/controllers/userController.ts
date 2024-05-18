import { User } from "@/models/User";
import { NextFunction, Request, Response } from "express";

export const UserController = {
  async users(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      res.send({
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
};
