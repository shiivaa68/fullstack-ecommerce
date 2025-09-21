import { Router, Request, Response } from "express";
import Product from "../models/Product";
import { requireRole } from "../middlewares/roleMiddleware";
import { productValidator } from "../validators/productValidator";
import { validate } from "../middlewares/validate";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

// Get all products // public
router.get("/", async (_, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Create product admin only
router.post(
  "/",
  requireRole(["admin"]),
  productValidator,
  validate,
  catchAsync(async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.json(product);
  })
);

// Get single product //public
router.get("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// Update product //admin
router.put("/:id", requireRole(["admin"]), async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  await product.update(req.body);
  res.json(product);
});
// Delete product //admin
router.delete("/:id", requireRole(["admin"]), async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  await product.destroy();
  res.json({ message: "Product deleted" });
});

export default router;
