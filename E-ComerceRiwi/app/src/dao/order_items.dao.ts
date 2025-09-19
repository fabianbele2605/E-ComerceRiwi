/**
 * Shopping Cart DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the shopping cart.
 *
 * It bridges the gap between the high-level `ShoppingCart` DTOs and the
 * low-level `OrderItem` ORM model, handling complex operations like
 * adding, updating, and retrieving a user's entire cart.
 */

import OrderItem, { OrderItemCreationAttributes, OrderItemAttributes } from "../models/orderItem.model";
import { AddShoppingCartDto, UpdateCartItemDto } from "../dto/order_items.dto";

/**
 * Inserts a new shopping cart record into the database by creating multiple order items.
 *
 * @param {number} userId - The unique identifier of the user.
 * @param {AddShoppingCartDto['products']} products - An array of products to add to the cart.
 * @returns {Promise<OrderItemAttributes[]>} - An array of the created order item records.
 */
export const createShoppingCart = async (userId: number, products: AddShoppingCartDto['products']): Promise<OrderItemAttributes[]> => {
    // Note: In a real-world application, this function would first create an 'Order'
    // and then link these OrderItems to that new order.
    // For this example, we assume `order_id` is a placeholder for `userId`.
    const orderId = userId;

    const orderItemsToCreate: OrderItemCreationAttributes[] = products.map(product => ({
        order_id: orderId,
        price: product.price,
        quantity: product.quantity,
        subtotal: product.price * product.quantity,
        is_active: true,
    }));

    // We use a bulk create to insert all order items at once for better performance.
    const createdItems = await OrderItem.bulkCreate(orderItemsToCreate);
    return createdItems.map(item => item.get());
};

/**
 * Updates an existing shopping cart by modifying product quantities or other details.
 *
 * @param {number} userId - The unique identifier of the user.
 * @param {UpdateCartItemDto['products']} productsToUpdate - An array of product updates.
 * @returns {Promise<OrderItemAttributes[]>} - The updated order item records.
 */
export const updateShoppingCart = async (userId: number, productsToUpdate: UpdateCartItemDto['products']): Promise<OrderItemAttributes[]> => {
    // Note: In a real-world application, updating would be done via a unique product ID,
    // not just the name, to prevent issues with duplicate product names.
    const updatedItems: OrderItemAttributes[] = [];

    // Assuming we have an existing order for the user
    const orderId = userId;

    for (const product of productsToUpdate) {
        // Find the existing order item to update
        const existingItem = await OrderItem.findOne({
            where: {
                order_id: orderId,
                // This is a simplified lookup using product name
                // A better approach would be to use a product ID foreign key
                // name: product.name,
            },
        });

        if (existingItem) {
            // Update the existing item
            const [rowsAffected, [updatedItem]] = await OrderItem.update(
                { ...product, subtotal: product.price ? product.price * (product.quantity || existingItem.quantity) : undefined },
                {
                    where: { id_order_item: existingItem.id_order_item },
                    returning: true,
                }
            );

            if (rowsAffected > 0) {
                updatedItems.push(updatedItem.get());
            }
        }
    }
    return updatedItems;
};

/**
 * Retrieves the entire shopping cart for a specific user.
 *
 * @param {number} userId - The unique identifier of the user.
 * @returns {Promise<OrderItemAttributes[]>} - A list of all active order items in the user's cart.
 */
export const getShoppingCartByUserId = async (userId: number): Promise<OrderItemAttributes[]> => {
    const orderItems = await OrderItem.findAll({ where: { order_id: userId, is_active: true } });
    return orderItems.map(item => item.get());
};

/**
 * Clears the shopping cart for a user by soft deleting all order items.
 *
 * @param {number} userId - The unique identifier of the user.
 * @returns {Promise<boolean>} - True if at least one item was soft deleted, false otherwise.
 */
export const clearShoppingCart = async (userId: number): Promise<boolean> => {
    const [rowsAffected] = await OrderItem.update(
        { is_active: false },
        { where: { order_id: userId, is_active: true } }
    );
    return rowsAffected > 0;
};
