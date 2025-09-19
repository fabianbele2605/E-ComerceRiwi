/**
 * Country Seeder
 * 
 * Seeds the countries table with world countries from countries.csv
 * Countries are used for international address and shipping management
 */

import * as countryDao from "../dao/country.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds countries from CSV file
 * 
 * Reads country data from CSV and creates country records in the database
 * Includes Latin American countries and major international markets
 */
export const seedCountries = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const countries: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/countries.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              countries.push(row);
          })
          .on('end', async () => {
              try {
                  for (const countryData of countries) {
                      await countryDao.createCountry(countryData);
                  }
                  console.log(`✅ ${countries.length} countries created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};