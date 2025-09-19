import app from "./server";
import sequelize from "./config/database";

// Import models in dependency order
import Role from "./models/role.model";
import Gender from "./models/gender.model";
import Access from "./models/access.model";
import User from "./models/user.model";
import Country from "./models/country.model";
import Department from "./models/department.model";
import City from "./models/city.model";
import Address from "./models/address.model";
import Category from "./models/category.model";
import Product from "./models/product.model";
import Bank from "./models/bank.model";
import OrderStatus from "./models/orderStatus.model";
import Order from "./models/order.model";
import PaymentMethod from "./models/paymentMethod.model";
import OrderPayment from "./models/orderPayment.model";
import OrderItem from "./models/orderItem.model";

import { applyAssociations } from "./models/associations";

const PORT = process.env.APP_PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la BD establecida...");

    // Apply associations
    applyAssociations();

    // Sync tables in correct order
    await Role.sync();
    await Gender.sync();
    await Access.sync();
    await User.sync();
    await Country.sync();
    await Department.sync();
    await City.sync();
    await Address.sync();
    await Category.sync();
    await Product.sync();
    await Bank.sync();
    await OrderStatus.sync();
    await Order.sync();
    await PaymentMethod.sync();
    await OrderPayment.sync();
    await OrderItem.sync();

    console.log("Tablas sincronizadas correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la BD :", error);
    process.exit(1);
  }
};

start();
