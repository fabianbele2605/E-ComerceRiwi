/**
 * Payment Method Seeder
 * 
 * Seeds the payment_methods table with available payment options from payment-methods.csv
 * Payment methods define how customers can pay for their orders
 */

import * as paymentMethodDao from "../dao/payment.dao";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds payment methods from CSV file
 * 
 * Reads payment method data from CSV and creates payment option records
 * Includes credit cards, digital wallets, bank transfers, and cash options
 */
export const seedPaymentMethods = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const paymentMethods: any[] = [];
        const csvPath = path.join(__dirname, '../docs/data/payment-methods.csv');
        
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('data', (row) => {
              row.is_active = row.is_active === 'true';
              paymentMethods.push(row);
          })
          .on('end', async () => {
              try {
                  for (const paymentMethodData of paymentMethods) {
                      await paymentMethodDao.createPaymentMethod(paymentMethodData);
                  }
                  console.log(`✅ ${paymentMethods.length} payment methods created from CSV`);
                  resolve();
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', reject);
    });
};