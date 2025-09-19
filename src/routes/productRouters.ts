import { Router } from "express";
import Product from "../models/Product";

const router = Router();

// Create product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (_, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Get single product
router.get("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// Update product
router.put("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  await product.update(req.body);
  res.json(product);
});
// Delete product
router.delete("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  await product.destroy();
  res.json({ message: "Product deleted" });
});

export default router;
