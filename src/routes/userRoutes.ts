import { Router } from "express";
import User from "../models/User";

const router = Router();

// Create user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

//Get all users
router.get("/", async (_, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get single user
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});
// Update user
router.put("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  await user.update(req.body);
  res.json(user);
});

// Delete user
router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  await user.destroy();
  res.json({ message: "User deleted" });
});

export default router;
