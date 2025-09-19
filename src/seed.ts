import sequelize from "./config/database";
import User from "./models/User";
import Product from "./models/Product";
import Order from "./models/Order";
import Cart from "./models/Cart";
import CartItem from "./models/CartItem";
import OrderItem from "./models/OrderItem";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ force: true }); // Drop + recreate tables
    console.log("✅ All models synced (force: true)");

    // Create a user
    const user = await User.create({
      name: "Shiva Tester",
      email: "shiva@example.com",
      password: "hashedpassword123",
    });

    // Create products
    const product1 = await Product.create({
      name: "Laptop",
      description: "High performance laptop",
      price: 1500,
      stock: 10,
    });

    const product2 = await Product.create({
      name: "Phone",
      description: "Smartphone with OLED display",
      price: 800,
      stock: 20,
    });

    // Create cart for user
    const cart = await Cart.create({ userId: user.id });

    // Add product1 to cart
    await CartItem.create({
      cartId: cart.id,
      productId: product1.id,
      quantity: 2,
    });

    // Create an order
    const order = await Order.create({ userId: user.id, total: 3100 });

    await OrderItem.create({
      orderId: order.id,
      productId: product1.id,
      quantity: 2,
      price: 1500,
    });

    console.log("🌱 Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

seed();