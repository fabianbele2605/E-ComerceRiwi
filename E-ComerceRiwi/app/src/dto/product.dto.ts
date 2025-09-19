// src/dto/product.dto.ts

/**
 * DTO de Products
 * ---------------
 * Este archivo define los Data Transfer Objects (DTO) relacionados con la entidad `products`.
 */

/**
 * Objeto de transferencia de datos para la creación de productos.
 *
  * @property {string} name - Nombre del producto.
 * @property {string} description - Descripción detallada del producto.
 * @property {number} price - Precio del producto.
 * @property {number} stock - Cantidad disponible en inventario.
 * @property {number} category_id - Identificador de la categoría a la que pertenece el producto.
 * @property {boolean} [is_active] - Estado del producto (activo/inactivo). Opcional, por defecto `true`.
 *
 * @example
 * const dto: CreateProductDto = {
 *   name: "Play Station 5",
 *   description: "Consola de videojuegos de última generación",
 *   price: 150.0,
 *   stock: 100,
 *   categoryId: 123456,
 *   imageUrl: "https://www.imag-ps5.com" // opcional
 * };
 */

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  is_active?: boolean;
}

/**
 * Objeto de transferencia de datos para la editacion de productos.
 *
 * @property {string} name - Nombre del producto.
 * @property {string} description - Descripción detallada del producto.
 * @property {number} price - Precio del producto en la moneda definida.
 * @property {number} stock - Cantidad disponible en inventario.
 * @property {number} categoryId - Identificador de la categoría a la que pertenece el producto.
 * @property {boolean} [is_active] - Estado del producto (activo/inactivo). Opcional, por defecto `true`.
 *
 * @example
 * const dto: CreateProductDto = {
 *   category_id: 1,
 *   name: "Play Station 5",
 *   description: "Consola de videojuegos de última generación",
 *   price: 1500.0,
 *   stock: 30,
 *   is_active: true
 * };
 */

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category_id?: number;
  is_active?: boolean;
}

/**
 * Objeto de transferencia de datos que representa la respuesta de un producto.
 *
 * @property {number} category_id - Identificador de la categoría a la que pertenece el producto.
 * @property {string} name - Nombre del producto.
 * @property {string} description - Descripción detallada del producto.
 * @property {number} price - Precio del producto en la moneda definida.
 * @property {number} stock - Cantidad disponible en inventario.
 * @property {number} categoryId - Identificador de la categoría a la que pertenece el producto.
 * @property {boolean} [is_active] - Estado del producto (activo/inactivo). Opcional, por defecto `true`.
 *
 * @example
 * const product: ProductResponseDto = {
 *   category_id: 1,
 *   name: "Play Station 5",
 *   description: "Consola de videojuegos de última generación",
 *   price: 1500.0,
 *   stock: 30,
 *   is_active: true
 * };
 */

export interface ProductResponseDto {
  id_product: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}