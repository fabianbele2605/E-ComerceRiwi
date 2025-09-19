/**
 * User Seeder
 * 
 * Seeds the users table with data from users.csv
 * Users are the main entities that interact with the system
 */

import * as userDao from "../dao/user.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds users from CSV file
 * 
 * Reads user data from CSV and creates user records in the database
 * Users are linked to roles via foreign key relationship
 */
export const seedUsers = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const users: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/users.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              users.push(row);
          })
          .on('end', async () => {
              try {
                  for (const userData of users) {
                      await userDao.createUser(userData);
                  }
                  console.log(`✅ ${users.length} users created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};