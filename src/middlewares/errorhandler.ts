import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("ERROR 💥", err);

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
