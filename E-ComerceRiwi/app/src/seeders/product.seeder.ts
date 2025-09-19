/**
 * Product Seeder
 * 
 * Seeds the products table with sports products from products.csv
 * Products are the main items sold in the e-commerce platform
 */

import * as productDao from "../dao/product.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds products from CSV file
 * 
 * Reads product data from CSV and creates product records
 * Each product has name, description, price, stock, and category reference
 */
export const seedProducts = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const products: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/products.csv');
        
        // Read CSV file and process each row
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              // Convert string values to appropriate data types
              row.price = parseInt(row.price);        // Convert price to integer
              row.stock = parseInt(row.stock);        // Convert stock to integer
              row.category_id = parseInt(row.categoryId); // Map categoryId to category_id
              delete row.categoryId; // Remove original property
              products.push(row);
          })
          .on('end', async () => {
              try {
                  // Create each product record in the database
                  for (const productData of products) {
                      await productDao.createProduct(productData);
                  }
                  console.log(`✅ ${products.length} products created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};
