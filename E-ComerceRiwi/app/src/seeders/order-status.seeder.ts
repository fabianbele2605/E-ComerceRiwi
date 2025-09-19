/**
 * Order Status Seeder
 * 
 * Seeds the order_status table with order workflow states from order-status.csv
 * Order statuses track the lifecycle of orders from creation to completion
 */

import * as orderStatusDao from "../dao/order_status.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds order statuses from CSV file
 * 
 * Reads order status data from CSV and creates status records
 * Includes states like Pending, Confirmed, Shipped, Delivered, etc.
 */
export const seedOrderStatus = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const orderStatuses: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/order-status.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              orderStatuses.push(row);
          })
          .on('end', async () => {
              try {
                  for (const orderStatusData of orderStatuses) {
                      await orderStatusDao.createOrderStatus(orderStatusData);
                  }
                  console.log(`✅ ${orderStatuses.length} order statuses created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};