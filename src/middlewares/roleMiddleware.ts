import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface JwtPayload {
  id: number;
  role: "user" | "admin";
}

export const requireRole = (roles: ("user" | "admin")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "No token provided" });

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // attach to request
      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};
