import * as genderDao from "../dao/genders.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

export const seedGenders = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const genders: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/genders.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              row.is_active = row.is_active === 'true';
              genders.push(row);
          })
          .on('end', async () => {
              try {
                  for (const genderData of genders) {
                      await genderDao.createGender(genderData);
                  }
                  console.log(`✅ ${genders.length} genders created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};