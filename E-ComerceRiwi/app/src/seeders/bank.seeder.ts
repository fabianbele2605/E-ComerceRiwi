/**
 * Bank Seeder
 * 
 * Seeds the banks table with financial institutions from banks.csv
 * Banks are used for payment processing and financial transactions
 */

import * as bankDao from "../dao/bank.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds banks from CSV file
 * 
 * Reads bank data from CSV and creates bank records
 * Includes major Colombian and international banks
 */
export const seedBanks = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const banks: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/banks.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              row.is_active = row.is_active === 'true';
              banks.push(row);
          })
          .on('end', async () => {
              try {
                  for (const bankData of banks) {
                      await bankDao.createBank(bankData);
                  }
                  console.log(`✅ ${banks.length} banks created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};