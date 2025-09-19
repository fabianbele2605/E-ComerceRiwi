/**
 * Final Complete Seeder
 * Uses all existing models to populate the database
 */

import sequelize from "../config/database";
import "../models/associations";
import * as fs from "fs";
import * as path from "path";

// Import all models
import Role from "../models/role.model";
import Category from "../models/category.model";
import User from "../models/user.model";
import Country from "../models/country.model";
import Department from "../models/department.model";
import City from "../models/city.model";
import Bank from "../models/bank.model";
import PaymentMethod from "../models/paymentMethod.model";
import OrderStatus from "../models/orderStatus.model";
import Gender from "../models/gender.model";
import Access from "../models/access.model";
import Product from "../models/product.model";
import Address from "../models/address.model";
import Order from "../models/order.model";
import OrderPayment from "../models/orderPayment.model";
import OrderItem from "../models/orderItem.model";

/**
 * Helper function to read CSV and create records
 */
const seedFromCSV = async (model: any, filename: string, transform?: (row: any) => any) => {
  const csvPath = path.join(process.cwd(), `src/docs/data/${filename}`);
  const csvData = fs.readFileSync(csvPath, "utf-8");
  const lines = csvData.trim().split("\n");
  const headers = lines[0].split(",");
  
  const records = lines.slice(1).map(line => {
    const values = line.split(",");
    const record: any = {};
    headers.forEach((header, index) => {
      record[header] = values[index];
    });
    return transform ? transform(record) : record;
  });

  await model.bulkCreate(records);
  console.log(`✅ ${records.length} ${model.name} records created`);
};

/**
 * Main seeder function
 */
export const runFinalSeeder = async () => {
  try {
    console.log("🌱 Starting final database seeder...");
    
    // Sync database to create all tables
    await sequelize.sync({ force: true });
    console.log("📊 Database synchronized");
    
    // Level 1: Independent tables
    await seedFromCSV(Role, "roles.csv", (row) => ({
      ...row,
      is_active: row.is_active === 'true'
    }));
    
    await seedFromCSV(Category, "categories.csv", (row) => ({
      ...row,
      is_active: row.is_active === 'true'
    }));
    
    await seedFromCSV(Country, "countries.csv");
    await seedFromCSV(Department, "departaments.csv");
    await seedFromCSV(City, "cities.csv");
    await seedFromCSV(Bank, "banks.csv", (row) => ({
      ...row,
      is_active: row.is_active === 'true'
    }));
    
    await seedFromCSV(PaymentMethod, "payment-methods.csv", (row) => ({
      ...row,
      is_active: row.is_active === 'true'
    }));
    
    await seedFromCSV(OrderStatus, "order-status.csv");
    
    // Create genders manually
    const genders = [
      { name: "Male", is_active: true },
      { name: "Female", is_active: true },
      { name: "Other", is_active: true }
    ];
    await Gender.bulkCreate(genders);
    console.log("✅ Genders created");
    
    // Create accesses manually
    const accesses = [
      { role_id: 1, username: "admin", password: "admin123", is_active: true },
      { role_id: 2, username: "user1", password: "user123", is_active: true }
    ];
    await Access.bulkCreate(accesses);
    console.log("✅ Accesses created");
    
    // Level 2: Users using DAO
    const { UserDAO } = await import("../dao/user.dao");
    const userDao = new UserDAO();
    
    const usersData = [
      { 
        access_id: 1, 
        gender_id: 1, 
        full_name: "Admin User", 
        email: "admin@test.com", 
        birth_date: new Date('1990-01-01'), 
        phone: "3001234567", 
        is_active: true 
      },
      { 
        access_id: 2, 
        gender_id: 2, 
        full_name: "Regular User", 
        email: "user@test.com", 
        birth_date: new Date('1995-05-15'), 
        phone: "3007654321", 
        is_active: true 
      }
    ];
    
    for (const userData of usersData) {
      await userDao.create(userData);
    }
    console.log("✅ Users created using DAO");
    
    // Level 3: Products (depends on categories)
    await seedFromCSV(Product, "products.csv", (row) => ({
      ...row,
      price: parseFloat(row.price),
      stock: parseInt(row.stock),
      category_id: parseInt(row.categoryId)
    }));
    
    // Level 4: Addresses (depends on users, cities, departments, countries)
    await seedFromCSV(Address, "addresses.csv", (row) => ({
      ...row,
      user_id: parseInt(row.user_id),
      city_id: parseInt(row.city_id),
      departament_id: parseInt(row.departament_id),
      country_id: parseInt(row.country_id),
      is_active: row.is_active === 'true'
    }));
    
    // Level 5: Orders (depends on accesses, banks, order_status)
    await seedFromCSV(Order, "orders.csv", (row) => ({
      ...row,
      customer_id: parseInt(row.customer_id),
      bank_id: parseInt(row.bank_id),
      order_status_id: parseInt(row.order_status_id),
      total: parseFloat(row.total),
      is_active: row.is_active === 'true'
    }));
    
    console.log("✅ All tables seeded successfully!");
    
  } catch (error) {
    console.error("❌ Error running final seeder:", error);
    throw error;
  }
};

if (require.main === module) {
  runFinalSeeder()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Error:", error);
      process.exit(1);
    });
}