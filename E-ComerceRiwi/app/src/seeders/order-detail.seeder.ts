/**
 * Order Detail Seeder
 * 
 * Seeds the order_details table with order line items from order-details.csv
 * Order details represent individual products within orders
 */

import * as orderItemDao from "../dao/order_items.dao";
import * as fs from "fs";
import * as path from "path";

/**
 * Seeds order details from CSV file
 * 
 * Reads order detail data from CSV and creates order detail records
 * Each detail includes product quantity, subtotal, and links to orders and products
 */
export const seedOrderDetails = async () => {
  try {
    console.log("📦 Seeding order details...");
    
    const csvPath = path.join(__dirname, "../docs/data/order-details.csv");
    const csvData = fs.readFileSync(csvPath, "utf-8");
    const lines = csvData.trim().split("\n");
    const headers = lines[0].split(",");
    
    const orderDetails = lines.slice(1).map(line => {
      const values = line.split(",");
      const orderDetail: any = {};
      headers.forEach((header, index) => {
        const value = values[index];
        if (header === "order_id" || header === "product_id" || header === "amount") {
          orderDetail[header] = parseInt(value);
        } else if (header === "subtotal") {
          orderDetail[header] = parseFloat(value);
        } else if (header === "is_active") {
          orderDetail[header] = value === "true";
        } else {
          orderDetail[header] = value;
        }
      });
      return orderDetail;
    });

    // Agrupar por order_id y usar el DAO
    const orderGroups = orderDetails.reduce((groups: any, detail: any) => {
      const orderId = detail.order_id;
      if (!groups[orderId]) groups[orderId] = [];
      groups[orderId].push({
        price: detail.subtotal / detail.amount,
        quantity: detail.amount
      });
      return groups;
    }, {});
    
    for (const [orderId, products] of Object.entries(orderGroups)) {
      await orderItemDao.createShoppingCart(parseInt(orderId), products as any);
    }
    console.log("✅ Order details seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding order details:", error);
    throw error;
  }
};