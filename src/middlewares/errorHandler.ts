export const errorHandler = (error: any, req: any, res: any, next: any) => {
  res.status(error.statusCode ? (error.statusCode as number) : 500).send({
    errorCode: (error.statusCode as number) || 500,
    message: error.message,
    success: false,
  });
};
