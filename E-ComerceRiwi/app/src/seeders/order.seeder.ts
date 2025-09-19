/**
 * Order Seeder
 * 
 * Seeds the orders table with sample customer orders
 * Orders represent customer purchases in the e-commerce system
 */

import * as orderDao from "../dao/order.dao";

/**
 * Seeds sample orders
 * 
 * Creates sample order records with customer, product, and payment information
 * Links to customers, products, payment methods, and order statuses
 */
export const seedOrders = async () => {
    const orders = [
        {
            customer_id: 2,  
            bank_id: 1,  
            order_status_id: 1,
            total: 365000,
            is_active: true
        }
    ];

    for (const orderData of orders) {
        await orderDao.createOrder(orderData); 
    }
    console.log(`✅ ${orders.length} orders created`);
};
