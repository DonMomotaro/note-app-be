import { secret } from "@/services/tokenService";
import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "./throwError";
import jwt from "jsonwebtoken";

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw UnAuthorizedException();
    }
    const authToken = authHeader.split(" ")[1];
    try {
      const decoded: any = jwt.verify(authToken, secret);
      req.query["userId"] = decoded["user-id"];
      next();
    } catch (error) {
      throw UnAuthorizedException();
    }
  } catch (error) {
    next(error);
  }
};
