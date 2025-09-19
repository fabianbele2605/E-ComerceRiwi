/**
 * Department Seeder
 * 
 * Seeds the departments table with Colombian departments from departments.csv
 * Departments are administrative divisions within Colombia (states/provinces)
 */

import * as departmentDao from "../dao/department.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds departments from CSV file
 * 
 * Reads department data from CSV and creates department records
 * Includes all major Colombian administrative departments
 */
export const seedDepartments = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const departments: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/departaments.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              departments.push(row);
          })
          .on('end', async () => {
              try {
                  for (const departmentData of departments) {
                      await departmentDao.createDepartment(departmentData);
                  }
                  console.log(`✅ ${departments.length} departments created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};