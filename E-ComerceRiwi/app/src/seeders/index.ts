/**
 * Main Seeder Index
 * 
 * This file orchestrates the execution of all database seeders in the correct order
 * to respect foreign key dependencies and ensure proper data population.
 */

import sequelize from "../config/database";
import { seedUsers } from "./user.seeder";
import { seedRoles } from "./role.seeders";        
import { seedCategories } from "./category.seeder";
import { seedAccesses } from "./access.seeder";
import { seedGenders } from "./gender.seeder";
import { seedCountries } from "./country.seeder";
import { seedDepartments } from "./department.seeder";
import { seedCities } from "./city.seeder";
import { seedBanks } from "./bank.seeder";
import { seedOrderStatus } from "./order-status.seeder";
import { seedPaymentMethods } from "./payment-method.seeder";
import { seedProducts } from "./product.seeder";
import { seedOrders } from "./order.seeder";
import { seedAddresses } from "./address.seeder";
import { seedOrderDetails } from "./order-detail.seeder";

/**
 * Executes all seeders in the correct dependency order
 * 
 * The seeders are organized in 4 levels based on foreign key dependencies:
 * - Level 1: Independent tables (no foreign keys)
 * - Level 2: Tables with one level of dependencies
 * - Level 3: Tables with two levels of dependencies
 * - Level 4: Tables with three levels of dependencies
 */
export const runSeeders = async () => {
  try {
    console.log("🌱 Starting seeders...");
    
    // Synchronize database schema (drops and recreates all tables)
    await sequelize.sync({ force: true });
    console.log("📊 Database synchronized - all tables recreated");
    
    // Level 1: Independent tables (no FK)
    await seedRoles();
    await seedGenders();
    await seedCategories();
    await seedPaymentMethods();
    await seedBanks();
    await seedOrderStatus();
    await seedCountries();
    await seedDepartments();
    await seedCities();
    
    // Level 2: First dependency
    await seedAccesses();     // Requires roles
    await seedUsers();        // Requires accesses and genders
    await seedProducts();     // Requires categories
    
    // Level 3: Second dependency
    await seedOrders();       // Requires users, payment_methods, banks, order_status
    await seedAddresses();    // Requires cities, departments, countries, users
    
    // Level 4: Third dependency
    await seedOrderDetails(); // Requires orders and products
    
    console.log("✅ Seeders completed successfully");
  } catch (error) {
    console.error("❌ Error running seeders:", error);
    throw error;
  }
};

if (require.main === module) {
  runSeeders()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Error running seeders:", error);
      process.exit(1);
    });
}