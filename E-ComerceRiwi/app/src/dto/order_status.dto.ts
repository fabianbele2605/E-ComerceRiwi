// app/src/dto/order_status.dto.ts

/**
 * Order Status DTO
 * ----------------
 * This file defines the Data Transfer Objects (DTO) related to the order_status entity.
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for creating a new order status.
 *
 * @property {string} name - Name of the order status (e.g., "Pending", "Shipped", "Delivered").
 * @property {boolean} is_active - Whether the status is active (defaults to true).
 *
 * @example
 * const dto: CreateOrderStatusDto = {
 *   name: "Pending",
 *   is_active: true
 * };
 */
export interface CreateOrderStatusDto {
  name: string;
  is_active: boolean;
}

/**
 * Data Transfer Object for updating an order status.
 *
 * @property {string} [name] - Updated name of the order status.
 * @property {boolean} [is_active] - Whether the status is active.
 *
 * @example
 * const dto: UpdateOrderStatusDto = {
 *   name: "shipped",   
 *   is_active: false
 * };
 */
export interface UpdateOrderStatusDto {
  name?: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object representing the response of an order status.
 *
 * @property {string} name - Name of the order status.
 * @property {boolean} is_active - Whether the status is active.
 * @property {Date} createdAt - Timestamp when the order status was created.
 * @property {Date} updatedAt - Timestamp when the order status was last updated.
 *
 * @example
 * const status: OrderStatusResponseDto = {
 *   name: "Pending",
 *   is_active: true,
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 */
export interface OrderStatusResponseDto {
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}