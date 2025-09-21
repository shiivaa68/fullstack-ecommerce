import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

// Global error handler middleware
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("🔥 Error:", err);

  // If it's our custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Sequelize validation error
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: err.errors.map((e: any) => e.message).join(", "),
    });
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  // Fallback
  res.status(500).json({ error: "Something went wrong" });
};
