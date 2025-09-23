import { Router, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValidator, loginValidator, updateUserValidator } from "../validators/userValidator";
import { validate } from "../middlewares/validate";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";
import { requireRole } from "../middlewares/roleMiddleware";
import { authenticate, AuthRequest } from "../middlewares/auth";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// ✅ Register
router.post(
  "/register",
  registerValidator,
  validate,
  catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) throw new AppError("Email already in use", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: "user" });

    res.status(201).json({
      message: "User registered",
      user: { id: user.id, name: user.name, email: user.email },
    });
  })
);

// ✅ Login
router.post(
  "/login",
  loginValidator,
  validate,
  catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new AppError("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  })
);

// ✅ Get all users (admin only)
router.get(
  "/",
  authenticate,
  requireRole(["admin"]),
  catchAsync(async (_req: AuthRequest, res: Response) => {
    const users = await User.findAll({ attributes: ["id", "name", "email", "role"] });
    res.json(users);
  })
);

// ✅ Get single user (admin or self)
router.get(
  "/:id",
  authenticate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "role"],
    });
    if (!user) throw new AppError("User not found", 404);

    // Only admin or the user themselves
    if (req.user.role !== "admin" && req.user.id !== user.id) {
      throw new AppError("Forbidden", 403);
    }

    res.json(user);
  })
);

// ✅ Update user (admin or self)
router.put(
  "/:id",
  authenticate,
  updateUserValidator,
  validate,
  catchAsync(async (req: AuthRequest, res: Response) => {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new AppError("User not found", 404);

    // Only admin or the user themselves
    if (req.user.role !== "admin" && req.user.id !== user.id) {
      throw new AppError("Forbidden", 403);
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.update(req.body);
    res.json({ message: "User updated", user });
  })
);

// ✅ Delete user (admin only)
router.delete(
  "/:id",
  authenticate,
  requireRole(["admin"]),
  catchAsync(async (req: AuthRequest, res: Response) => {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new AppError("User not found", 404);

    await user.destroy();
    res.json({ message: "User deleted" });
  })
);

export default router;
