// app/src/models/associations.ts

/**
 * associations
 * -----------------
 * This file defines all the Sequelize associations (relationships) 
 * between the models in the application.
 *
 * It contains:
 * - One-to-Many relationships. 
 * - One-to-One relationships.
 * - Many-to-Many through intermediate tables .
 *
 * Associations allow Sequelize to understand how models are linked 
 * and enable the use of `include` in queries for eager loading.
 *
 * This file should be imported and executed after all models are initialized.
 */
import Role from "./role.model";
import Access from "./access.model";
import User from "./user.model";
import genders from "./gender.model";
import Address from "./address.model";
import City from "./city.model";
import Department from "./department.model";
import Country from "./country.model";
import Category from "./category.model";
import Product from "./product.model";
import Order from "./order.model";
import Bank from "./bank.model";
import OrderStatus from "./orderStatus.model";
import OrderPayment from "./orderPayment.model";
import PaymentMethods from "./paymentMethod.model";
import OrderItem from "./orderItem.model";



/**
 * Initializes all model associations.
 *
 * Each association is defined using Sequelize methods:
 * - `hasMany`: One-to-Many relationship.
 * - `belongsTo`: Many-to-One relationship.
 * - `hasOne`: One-to-One relationship.
 *
 * Aliases (`as`) are defined to make query includes more readable.
 *
 * Example:
 * ```ts
 * Role.hasMany(Access, { foreignKey: "role_id", as: "accesses" });
 * ```
 */

export const applyAssociations = () => {
  Role.hasMany(Access, { foreignKey: "role_id", as: "accesses" });
  Access.belongsTo(Role, { foreignKey: "role_id", as: "role" });

  Access.hasOne(User, { foreignKey: "access_id", as: "user" });
  User.belongsTo(Access, { foreignKey: "access_id", as: "access" });

  genders.hasMany(User, { foreignKey: "gender_id", as: "users" });
  User.belongsTo(genders, { foreignKey: "gender_id", as: "gender" });

  User.hasMany(Address, { foreignKey: "user_id", as: "addresses" });
  Address.belongsTo(User, { foreignKey: "user_id", as: "user" });

  City.hasMany(Address, { foreignKey: "city_id", as: "addresses" });
  Address.belongsTo(City, { foreignKey: "city_id", as: "city" });

   Department.hasMany(Address, { foreignKey: "department_id", as: "addresses" });
   Address.belongsTo(Department, { foreignKey: "department_id", as: "department" });

   Country.hasMany(Address, { foreignKey: "country_id", as: "addresses" });
   Address.belongsTo(Country, { foreignKey: "country_id", as: "country" });

   Category.hasMany(Product, { foreignKey: "category_id", as: "products" });
   Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });
  
   Access.hasMany(Order, { foreignKey: "customer_id", as: "orders" });
   Order.belongsTo(Access, { foreignKey: "customer_id", as: "customer" });

   Bank.hasMany(Order, { foreignKey: "bank_id", as: "orders" });
   Order.belongsTo(Bank, { foreignKey: "bank_id", as: "bank" });

   OrderStatus.hasMany(Order, { foreignKey: "order_status_id", as: "orders" });
   Order.belongsTo(OrderStatus, { foreignKey: "order_status_id", as: "status" });

   Order.hasMany(OrderPayment, { foreignKey: "order_id", as: "payments" });
   OrderPayment.belongsTo(Order, { foreignKey: "order_id", as: "order" });

   PaymentMethods.hasMany(OrderPayment, { foreignKey: "payment_method_id", as: "payments" });
   OrderPayment.belongsTo(PaymentMethods, { foreignKey: "payment_method_id", as: "paymentMethod" });

   Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
   OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

   Product.hasMany(OrderItem, { foreignKey: "product_id", as: "orderItems" });
   OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });


 
};
