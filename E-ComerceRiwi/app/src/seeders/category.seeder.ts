/**
 * Category Seeder
 * 
 * Seeds the categories table with sports categories from categories.csv
 * Categories are used to classify products in the e-commerce system
 */

import * as categoryDao from "../dao/categories.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds categories from CSV file
 * 
 * Reads category data from CSV and creates category records
 * Categories include various sports like Football, Basketball, Tennis, etc.
 */
export const seedCategories = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const categories: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/categories.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              row.is_active = row.is_active === 'true';
              categories.push(row);
          })
          .on('end', async () => {
              try {
                  for (const categoryData of categories) {
                      await categoryDao.createCategory(categoryData);
                  }
                  console.log(`✅ ${categories.length} categories created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};