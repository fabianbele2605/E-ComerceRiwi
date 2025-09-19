/**
 * Role Seeder
 * 
 * Seeds the roles table with data from roles.csv
 * Roles define user permissions and access levels in the system
 */

import * as roleDao from "../dao/role.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds roles from CSV file
 * 
 * Reads role data from CSV and creates role records in the database
 * Each role has a name and active status
 */
export const seedRoles = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const roles: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/roles.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              row.is_active = row.is_active === 'true';
              roles.push(row);
          })
          .on('end', async () => {
              try {
                  for (const roleData of roles) {
                      await roleDao.createRole(roleData);
                  }
                  console.log(`✅ ${roles.length} roles created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};
