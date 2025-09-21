import { Request,Response } from "express";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import Cart from "../models/Cart";
import CartItem from "../models/CartItem";
import Product from "../models/Product";
import { AuthRequest } from "../middlewares/auth";


export const checkout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    // 1. Get user cart
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const cartItems = await CartItem.findAll({ where: { cartId: cart.id }, include: [Product] });
    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 2. Create order
    const order = await Order.create({ userId, total: 0 });

    let total = 0;

    // 3. Move cart items -> order items
    for (const item of cartItems) {
      const product = item.get("Product") as Product;
      const price = product.price * item.quantity;
      total += price;

      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // 4. Update order total
    order.total = total;
    await order.save();

    // 5. Clear cart
    await CartItem.destroy({ where: { cartId: cart.id } });

    res.json({ message: "Checkout successful", order });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
