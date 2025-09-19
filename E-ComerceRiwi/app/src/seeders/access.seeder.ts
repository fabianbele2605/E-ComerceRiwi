import * as accessDao from "../dao/accesses.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

export const seedAccesses = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const accesses: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/accesses.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              row.is_active = row.is_active === 'true';
              row.role_id = parseInt(row.role_id);
              accesses.push(row);
          })
          .on('end', async () => {
              try {
                  for (const accessData of accesses) {
                      await accessDao.createAccess(accessData);
                  }
                  console.log(`✅ ${accesses.length} accesses created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};