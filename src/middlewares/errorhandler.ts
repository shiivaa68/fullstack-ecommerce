import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import logger from "../utils/logger";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.message || "Unexpected error");

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
