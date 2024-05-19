import { STATUS_CODE } from "@/constants/statusCode";

export type CustomErrorType = {
  message: string;
  statusCode: number;
};

const createError = (statusCode: number, message: string): CustomErrorType => {
  return {
    message,
    statusCode,
  };
};

export const NotFoundException = (cusMessage: string = "Not found!") => {
  return createError(STATUS_CODE.NOT_FOUND, cusMessage);
};

export const UnAuthorizedException = (cusMessage: string = "Unauthorized") => {
  return createError(STATUS_CODE.UNAUTHORIZED, cusMessage);
};

export const BadRequestException = (cusMessage: string = "Bad Request!") => {
  return createError(STATUS_CODE.BAD_REQUEST, cusMessage);
};

export const ConflictException = (cusMessage: string = "Conflict!") => {
  return createError(STATUS_CODE.CONFLICT, cusMessage);
};
