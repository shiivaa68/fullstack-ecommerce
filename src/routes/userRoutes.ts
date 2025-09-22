import { Router, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValidator, loginValidator, updateUserValidator } from "../validators/userValidator";
import { validate } from "../middlewares/validate";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";

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

    res.status(201).json({ message: "User registered", user: { id: user.id, name: user.name, email: user.email } });
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

// ✅ Update user
router.put(
  "/:id",
  updateUserValidator,
  validate,
  catchAsync(async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new AppError("User not found", 404);

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.update(req.body);
    res.json({ message: "User updated", user });
  })
);

export default router;
