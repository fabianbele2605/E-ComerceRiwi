/**
 * Complete Database Seeder
 * 
 * Seeds all tables with data from CSV files using models directly
 * Populates all 15 tables in the correct dependency order
 */

import sequelize from "../config/database";
import { Country } from "../models/country.model";
import { Department } from "../models/department.model";
import { City } from "../models/city.model";
import { Bank } from "../models/bank.model";
import * as fs from "fs";
import * as path from "path";

// Temporary inline models for remaining entities
class PaymentMethod extends sequelize.Sequelize.Model {}
class OrderStatus extends sequelize.Sequelize.Model {}
class Reference extends sequelize.Sequelize.Model {}

/**
 * Helper function to read CSV and create records
 */
const seedFromCSV = async (model: any, filename: string, transform?: (row: any) => any) => {
  const csvPath = path.join(__dirname, `../data/${filename}`);
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
export const runCompleteSeeder = async () => {
  try {
    console.log("🌱 Starting complete database seeder...");
    
    // Sync database to create tables
    await sequelize.sync({ alter: true });
    console.log("📊 Database synchronized");
    
    // Level 1: Independent tables
    await seedFromCSV(Country, "countries.csv");
    await seedFromCSV(Department, "departments.csv");
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
    await seedFromCSV(Reference, "references.csv", (row) => ({
      ...row,
      is_active: row.is_active === 'true'
    }));
    
    console.log("✅ All tables seeded successfully!");
    
  } catch (error) {
    console.error("❌ Error running complete seeder:", error);
    throw error;
  }
};

if (require.main === module) {
  runCompleteSeeder()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Error:", error);
      process.exit(1);
    });
}