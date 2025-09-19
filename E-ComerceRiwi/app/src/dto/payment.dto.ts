// src/dto/payment.dto.ts

/**
 * DTO de Métodos de Pago
 * ----------------------
 * Este archivo define los Data Transfer Objects (DTO) relacionados con la entidad `payment_methods`.
 */

/**
 * Objeto de transferencia de datos para la creación de un método de pago.
 *
 * @property {string} name - Nombre del método de pago.
 * @property {boolean} is_active - Indica si el método de pago está activo.
 *
 * @example
 * const dto: CreatePaymentMethodDto = {
 *   name: "Tarjeta de Crédito",
 *   is_active: true
 * };
 */
export interface CreatePaymentMethodDto {
  name: string;
  is_active: boolean; 
}

/**
 * Objeto de transferencia de datos para la actualización de un método de pago.
 *
 * @property {string} [name] - Nombre del método de pago.
 * @property {boolean} [is_active] - Indica si el método de pago está activo.
 *
 * @example
 * const dto: UpdatePaymentMethodDto = {
 *   name: "Tarjeta Débito",
 *   is_active: false
 * };
 */
export interface UpdatePaymentMethodDto {
  name?: string;
  is_active?: boolean;
}

/**
 * Objeto de transferencia de datos que representa la respuesta de un método de pago.
 *
 * @property {number} id - Identificador único del método de pago.
 * @property {string} name - Nombre del método de pago.
 * @property {boolean} is_active - Indica si el método de pago está activo.
 *
 * @example
 * const paymentMethod: PaymentMethodResponseDto = {
 *   id: 1,
 *   name: "Tarjeta de Crédito",
 *   is_active: true
 * };
 */
export interface PaymentMethodResponseDto {
  id: number;
  name: string;
  is_active: boolean;
}

