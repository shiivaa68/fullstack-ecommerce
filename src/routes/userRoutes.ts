import { Router, Request, Response } from "express";
import Product from "../models/Product";
import { requireRole } from "../middlewares/roleMiddleware";
import { productValidator } from "../validators/productValidator";
import { validate } from "../middlewares/validate";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";

const router = Router();

// Get all products
router.get(
  "/",
  catchAsync(async (_req: Request, res: Response) => {
    const products = await Product.findAll();
    res.json(products);
  })
);

// Create product (admin only)
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

// Get single product
router.get(
  "/:id",
  catchAsync(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw new AppError("Product not found", 404);
    res.json(product);
  })
);

// Update product
router.put(
  "/:id",
  requireRole(["admin"]),
  productValidator,
  validate,
  catchAsync(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw new AppError("Product not found", 404);
    await product.update(req.body);
    res.json(product);
  })
);

// Delete product
router.delete(
  "/:id",
  requireRole(["admin"]),
  catchAsync(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw new AppError("Product not found", 404);
    await product.destroy();
    res.json({ message: "Product deleted" });
  })
);

export default router;
