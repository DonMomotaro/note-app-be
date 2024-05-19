import { Response } from "express";
import { STATUS_CODE } from "@/constants/statusCode";

export const responseHandler = (
  res: Response,
  data = {},
  cusMessage?: string
) => {
  res.status(STATUS_CODE.SUCCESS).send({
    message: cusMessage || "Thành công",
    success: true,
    data,
  });
};
