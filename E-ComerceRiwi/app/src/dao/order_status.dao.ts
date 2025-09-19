/**
 * OrderStatus DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the `order_status` entity.
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import OrderStatus from "../models/orderStatus.model";
import { CreateOrderStatusDto, UpdateOrderStatusDto } from "../dto/order_status.dto";

/**
 * A consistent DTO that reflects the database structure for responses.
 * This is used to ensure the DAO returns a standardized object that
 * matches the ORM model's attributes.
 */
export interface OrderStatusResponseDto {
    id_order_status: number;
    name: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Inserts a new order status record into the database.
 * @param data - Data required to create the order status (CreateOrderStatusDto).
 * @returns {Promise<OrderStatusResponseDto>} - The created order status record.
 */
export const createOrderStatus = async (data: CreateOrderStatusDto): Promise<OrderStatusResponseDto> => {
    const newOrderStatus = await OrderStatus.create(data);

    // We map the Sequelize model instance to the response DTO
    const response: OrderStatusResponseDto = {
        id_order_status: newOrderStatus.id_order_status,
        name: newOrderStatus.name,
        is_active: newOrderStatus.is_active,
        createdAt: newOrderStatus.createdAt as Date,
        updatedAt: newOrderStatus.updatedAt as Date,
    };
    return response;
};

/**
 * Retrieves all order statuses from the 'order_status' table.
 * @returns {Promise<OrderStatusResponseDto[]>} - List of all order statuses.
 */
export const getOrderStatuses = async (): Promise<OrderStatusResponseDto[]> => {
    const orderStatuses = await OrderStatus.findAll();

    return orderStatuses.map(status => ({
        id_order_status: status.id_order_status,
        name: status.name,
        is_active: status.is_active,
        createdAt: status.createdAt as Date,
        updatedAt: status.updatedAt as Date,
    }));
};

/**
 * Retrieves all active order statuses from the 'order_status' table.
 * @returns {Promise<OrderStatusResponseDto[]>} - List of active order statuses.
 */
export const getActiveOrderStatuses = async (): Promise<OrderStatusResponseDto[]> => {
    const orderStatuses = await OrderStatus.findAll({ where: { is_active: true } });

    return orderStatuses.map(status => ({
        id_order_status: status.id_order_status,
        name: status.name,
        is_active: status.is_active,
        createdAt: status.createdAt as Date,
        updatedAt: status.updatedAt as Date,
    }));
};

/**
 * Retrieves an order status record by its unique ID.
 * @param id_order_status - Unique order status identifier.
 * @returns {Promise<OrderStatusResponseDto | null>} - The found order status record or null if not found.
 */
export const getOrderStatusById = async (id_order_status: number): Promise<OrderStatusResponseDto | null> => {
    const orderStatus = await OrderStatus.findByPk(id_order_status);

    if (!orderStatus) {
        return null;
    }

    return {
        id_order_status: orderStatus.id_order_status,
        name: orderStatus.name,
        is_active: orderStatus.is_active,
        createdAt: orderStatus.createdAt as Date,
        updatedAt: orderStatus.updatedAt as Date,
    };
};

/**
 * Updates an existing order status record by its ID.
 * @param id_order_status - Order status identifier to update.
 * @param data - Data to update (UpdateOrderStatusDto).
 * @returns {Promise<OrderStatusResponseDto | null>} - The updated order status record or null if not found.
 */
export const updateOrderStatus = async (id_order_status: number, data: UpdateOrderStatusDto): Promise<OrderStatusResponseDto | null> => {
    const [rowsAffected, [updatedOrderStatus]] = await OrderStatus.update(data, {
        where: { id_order_status },
        returning: true,
    });

    if (rowsAffected === 0) {
        return null;
    }

    return {
        id_order_status: updatedOrderStatus.id_order_status,
        name: updatedOrderStatus.name,
        is_active: updatedOrderStatus.is_active,
        createdAt: updatedOrderStatus.createdAt as Date,
        updatedAt: updatedOrderStatus.updatedAt as Date,
    };
};

/**
 * Performs a soft delete on an order status record by marking it as inactive.
 * @param id_order_status - Order status identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteOrderStatus = async (id_order_status: number): Promise<boolean> => {
    const [rowsAffected] = await OrderStatus.update(
        { is_active: false },
        { where: { id_order_status } }
    );

    return rowsAffected > 0;
};