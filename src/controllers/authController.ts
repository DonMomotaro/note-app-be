import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { User } from "@/models/User";
import {
  ConflictException,
  NotFoundException,
  UnAuthorizedException,
} from "@/middlewares/throwError";
import { tokenService } from "@/services/tokenService";
import { responseHandler } from "@/middlewares/responseHandler";

export const AuthController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        username,
      });
      if (user) {
        throw ConflictException("Tên đăng nhập đã tồn tại");
      }
      const hashPw = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        password: hashPw,
        fullName: "",
        avatar: "",
      });
      await newUser.save();
      const accessToken = tokenService.generateAccessToken({
        "user-id": newUser._id.toString(),
      });
      responseHandler(
        res,
        {
          accessToken,
        },
        "Đăng ký thành công"
      );
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        username,
      });
      if (!user) {
        throw UnAuthorizedException("Tên đăng nhập hoặc mật khẩu không đúng");
      }
      const checkPw = await bcrypt.compare(password, user.password);
      if (!checkPw) {
        throw UnAuthorizedException("Tên đăng nhập hoặc mật khẩu không đúng");
      }
      const accessToken = tokenService.generateAccessToken({
        "user-id": user._id.toString(),
      });
      responseHandler(
        res,
        {
          accessToken,
        },
        "Đăng nhập thành công"
      );
    } catch (error) {
      next(error);
    }
  },
};
