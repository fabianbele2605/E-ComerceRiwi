/**
 * Address Seeder
 * 
 * Seeds the addresses table with user address data from addresses.csv
 * Addresses store shipping and billing information for users
 */

import * as addressDao from "../dao/adresses.dao";
import * as fs from "fs";
import * as path from "path";

/**
 * Seeds addresses from CSV file
 * 
 * Reads address data from CSV and creates address records
 * Links addresses to cities, departments, countries, and user info
 */
export const seedAddresses = async () => {
  try {
    console.log("🏠 Seeding addresses...");
    
    const csvPath = path.join(__dirname, "../docs/data/addresses.csv");
    const csvData = fs.readFileSync(csvPath, "utf-8");
    const lines = csvData.trim().split("\n");
    const headers = lines[0].split(",");
    
    const addresses = lines.slice(1).map(line => {
      const values = line.split(",");
      const address: any = {};
      headers.forEach((header, index) => {
        const value = values[index];
        let fieldName = header;
        
        // Fix column name mismatch: departament_id -> department_id
        if (header === "departament_id") {
          fieldName = "department_id";
        }
        
        if (header === "city_id" || header === "departament_id" || header === "department_id" || header === "country_id" || header === "user_id") {
          address[fieldName] = parseInt(value);
        } else {
          address[fieldName] = value;
        }
      });
      return address;
    });

    for (const addressData of addresses) {
      console.log("Creating address with data:", addressData);
      await addressDao.createAddress(addressData);
    }
    console.log("✅ Addresses seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding addresses:", error);
    throw error;
  }
};