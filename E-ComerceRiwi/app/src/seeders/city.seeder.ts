/**
 * City Seeder
 * 
 * Seeds the cities table with Colombian cities from cities.csv
 * Cities are used for address and location management in the system
 */

import * as cityDao from "../dao/city.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds cities from CSV file
 * 
 * Reads city data from CSV and creates city records in the database
 * Cities include major Colombian urban centers
 */
export const seedCities = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const cities: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/cities.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              cities.push(row);
          })
          .on('end', async () => {
              try {
                  for (const cityData of cities) {
                      await cityDao.createCity(cityData);
                  }
                  console.log(`✅ ${cities.length} cities created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};