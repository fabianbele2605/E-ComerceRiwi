// src/dto/order/create-order.dto.ts

/**
 * DTO de Orders
 * --------------
 * Este archivo define los Data Transfer Objects (DTO) relacionados con la entidad `orders`.
 */

/**
 * Objeto de transferencia de datos para la creación de una orden.
 *
 * @property {number} customer_id - Identificador del cliente.
 * @property {number} bank_id - Lista de identificadores de los productos que se incluyen en la orden.
 * @property {number} order_status_id  - Estado actual de la orden (por ejemplo: 'pendiente', 'enviado', 'entregado').
 * @property {number} total - total value for order.
 * @property {boolean} is_active - state of the product (true for avalible to see/false for not avalible to see)
 * 
 * @example
 * const dto: CreateOrderDto = {
 *   customerId: 123456,
 *   productIds: [1, 2, 3],
 *   totalAmount: 500.0,
 *   orderStatus: 'pendiente',
 *   shippingAddress: 'Calle Ficticia 123, Ciudad, País',
 *   paymentMethod: 'tarjeta'
 *   createdAt: '2023-09-12T10:00:00Z'
 * };
 */

export interface CreateOrderDto {
  customer_id: number;
  bank_id: number;
  order_status_id: number;
  total: number;
  is_active: boolean;
}

// src/dto/order/update-order.dto.ts

/**
 * Objeto de transferencia de datos para la edición de una orden.
 *
 * @property {number} [customer_id] - Identificador del cliente.
 * @property {number} [bank_id] - Lista de identificadores de los productos que se incluyen en la orden.
 * @property {number} [order_status_id]  - Estado actual de la orden (por ejemplo: 'pendiente', 'enviado', 'entregado').
 * @property {number} [total] - total value for order.
 * @property {boolean} [is_active] - state of the product (true for avalible to see/false for not avalible to see)
 *
 * @example
 * const dto: UpdateOrderDto = {
 *    customer_id: number;
 *    bank_id: number;
 *    order_status_id: number;
 *    total: number;
 *    is_active: boolean;
 * };
 */

export interface UpdateOrderDto {
  customer_id?: number;
  bank_id?: number;
  order_status_id?: number;
  total?: number;
  is_active?: boolean;
}

// src/dto/order/order-response.dto.ts

/**
 * Objeto de transferencia de datos que representa la respuesta de una orden.
 *
 * @property {number} customer_id - Identificador del cliente.
 * @property {number} bank_id - Lista de identificadores de los productos que se incluyen en la orden.
 * @property {number} order_status_id  - Estado actual de la orden (por ejemplo: 'pendiente', 'enviado', 'entregado').
 * @property {number} total - total value for order.
 * @property {boolean} is_active - state of the product (true for avalible to see/false for not avalible to see)
 *
 * @example
 * const order: OrderResponseDto = {
 *   id: 1,
 *   customerId: 123456,
 *   productIds: [1, 2, 3],
 *   totalAmount: 500.0,
 *   orderStatus: 'enviado',
 *   shippingAddress: 'Calle Ficticia 123, Ciudad, País',
 *   paymentMethod: 'tarjeta',
 *   specialInstructions: 'Dejar en la puerta.',
 *   paymentStatus: 'pagado',
 *   createdAt: '2023-09-12T10:00:00Z'
 * };
 */

export interface OrderResponseDto {
  customer_id: number;
  bank_id: number;
  order_status_id: number;
  total: number;
  is_active: boolean;
}
