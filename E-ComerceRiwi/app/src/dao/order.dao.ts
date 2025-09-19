/**
 * Order DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the orders entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import Order from "../models/order.model";
import { CreateOrderDto, UpdateOrderDto } from "../dto/order.dto";

/**
 * A consistent DTO that reflects the database structure for responses.
 * This is used to ensure the DAO returns a standardized object that
 * matches the ORM model's attributes.
 */
export interface OrderResponseDto {
    id_order: number;
    customer_id: number;
    bank_id: number;
    order_status_id: number;
    total: number;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Inserts a new order record into the database.
 * @param data - Data required to create the order (CreateOrderDto).
 * @returns {Promise<OrderResponseDto>} - The created order record.
 */
export const createOrder = async (data: CreateOrderDto): Promise<OrderResponseDto> => {
    const newOrder = await Order.create(data);

    // We map the Sequelize model instance to the response DTO
    const response: OrderResponseDto = {
        id_order: newOrder.id_order,
        customer_id: newOrder.customer_id,
        bank_id: newOrder.bank_id,
        order_status_id: newOrder.order_status_id,
        total: newOrder.total,
        is_active: newOrder.is_active,
        createdAt: newOrder.createdAt as Date,
        updatedAt: newOrder.updatedAt as Date,
    };
    return response;
};

/**
 * Retrieves all orders from the 'orders' table.
 * @returns {Promise<OrderResponseDto[]>} - List of all orders.
 */
export const getOrders = async (): Promise<OrderResponseDto[]> => {
    const orders = await Order.findAll();

    return orders.map(order => ({
        id_order: order.id_order,
        customer_id: order.customer_id,
        bank_id: order.bank_id,
        order_status_id: order.order_status_id,
        total: order.total,
        is_active: order.is_active,
        createdAt: order.createdAt as Date,
        updatedAt: order.updatedAt as Date,
    }));
};

/**
 * Retrieves all active orders from the 'orders' table.
 * @returns {Promise<OrderResponseDto[]>} - List of active orders.
 */
export const getActiveOrders = async (): Promise<OrderResponseDto[]> => {
    const orders = await Order.findAll({ where: { is_active: true } });

    return orders.map(order => ({
        id_order: order.id_order,
        customer_id: order.customer_id,
        bank_id: order.bank_id,
        order_status_id: order.order_status_id,
        total: order.total,
        is_active: order.is_active,
        createdAt: order.createdAt as Date,
        updatedAt: order.updatedAt as Date,
    }));
};

/**
 * Retrieves an order record by its unique ID.
 * @param id_order - Unique order identifier.
 * @returns {Promise<OrderResponseDto | null>} - The found order record or null if not found.
 */
export const getOrderById = async (id_order: number): Promise<OrderResponseDto | null> => {
    const order = await Order.findByPk(id_order);

    if (!order) {
        return null;
    }

    return {
        id_order: order.id_order,
        customer_id: order.customer_id,
        bank_id: order.bank_id,
        order_status_id: order.order_status_id,
        total: order.total,
        is_active: order.is_active,
        createdAt: order.createdAt as Date,
        updatedAt: order.updatedAt as Date,
    };
};

/**
 * Retrieves all orders for a specific customer.
 * @param customer_id - The customer's unique identifier.
 * @returns {Promise<OrderResponseDto[]>} - A list of orders for the customer.
 */
export const getOrdersByCustomerId = async (customer_id: number): Promise<OrderResponseDto[]> => {
    const orders = await Order.findAll({ where: { customer_id, is_active: true } });

    return orders.map(order => ({
        id_order: order.id_order,
        customer_id: order.customer_id,
        bank_id: order.bank_id,
        order_status_id: order.order_status_id,
        total: order.total,
        is_active: order.is_active,
        createdAt: order.createdAt as Date,
        updatedAt: order.updatedAt as Date,
    }));
};

/**
 * Updates an existing order record by its ID.
 * @param id_order - Order identifier to update.
 * @param data - Data to update (UpdateOrderDto).
 * @returns {Promise<OrderResponseDto | null>} - The updated order record or null if not found.
 */
export const updateOrder = async (id_order: number, data: UpdateOrderDto): Promise<OrderResponseDto | null> => {
    const [rowsAffected, [updatedOrder]] = await Order.update(data, {
        where: { id_order },
        returning: true,
    });

    if (rowsAffected === 0) {
        return null;
    }

    return {
        id_order: updatedOrder.id_order,
        customer_id: updatedOrder.customer_id,
        bank_id: updatedOrder.bank_id,
        order_status_id: updatedOrder.order_status_id,
        total: updatedOrder.total,
        is_active: updatedOrder.is_active,
        createdAt: updatedOrder.createdAt as Date,
        updatedAt: updatedOrder.updatedAt as Date,
    };
};

/**
 * Performs a soft delete on an order record by marking it as inactive.
 * @param id_order - Order identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteOrder = async (id_order: number): Promise<boolean> => {
    const [rowsAffected] = await Order.update(
        { is_active: false },
        { where: { id_order } }
    );

    return rowsAffected > 0;
};