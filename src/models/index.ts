// src/models/index.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// ✅ Use single DB_URL
const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

// Import models
import User from "./User";
import Product from "./Product";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Order from "./Order";
import OrderItem from "./OrderItem";

// Init associations
User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

export {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
