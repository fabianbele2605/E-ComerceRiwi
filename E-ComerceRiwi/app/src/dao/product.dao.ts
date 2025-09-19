// src/dao/product.dao.ts

/**
 * Product DAO
 * ----------------
 * Este archivo contiene las funciones de acceso a datos (DAO) para la entidad `Product`.
 *
 * El patrón DAO (Data Access Object) encapsula la lógica de acceso a la base de datos,
 * separándola de los controladores y asegurando una mejor organización del código.
 *
 * Funciones definidas:
 *  - createProduct: Inserta un nuevo producto en la base de datos.
 *  - getProducts: Obtiene todos los productos.
 *  - getProductById: Obtiene un producto por su ID.
 *  - updateProduct: Actualiza un producto existente.
 *  - deleteProduct: Elimina un producto de la base de datos (delete real).
 */

import Product from "../models/product.model";
import { CreateProductDto, UpdateProductDto, ProductResponseDto} from "../dto/product.dto";

/**
 * Inserta un nuevo producto en la base de datos.
 *
 * @param data - Datos necesarios para crear el producto (CreateProductDto).
 * @returns {Promise<ProductResponseDto>} - Producto creado.
 */
export const createProduct = async (data: CreateProductDto): Promise<ProductResponseDto> => {
  const product = await Product.create({
    category_id: data.category_id,
    name: data.name,
    price: data.price,
    description: data.description,
    stock: data.stock,
    is_active: data.is_active ?? true, // valor por defecto si no se proporciona
  });
  return product.toJSON() as ProductResponseDto;
};

/**
 * Obtiene todos los productos de la tabla `products`.
 *
 * @returns {Promise<ProductResponseDto[]>} - Lista de productos.
 */
export const getProducts = async (): Promise<ProductResponseDto[]> => {
  const products = await Product.findAll();
  return products.map((p) => p.toJSON() as ProductResponseDto);
};

/**
 * Obtiene un producto por su ID.
 *
 * @param id - Identificador único del producto.
 * @returns {Promise<ProductResponseDto | null>} - Producto encontrado o null si no existe.
 */
export const getProductById = async (id: number): Promise<ProductResponseDto | null> => {
  const product = await Product.findByPk(id);
  return product ? (product.toJSON() as ProductResponseDto) : null;
};

/**
 * Actualiza un producto existente.
 *
 * @param id - Identificador único del producto.
 * @param data - Datos a actualizar (UpdateProductDto).
 * @returns {Promise<ProductResponseDto | null>} - Producto actualizado o null si no existe.
 */
export const updateProduct = async (id_product: number, data: UpdateProductDto): Promise<ProductResponseDto | null> => {
  const [rows, products] = await Product.update(data, {
    where: { id_product },
    returning: true,
  });

  if (rows > 0 && products.length > 0) {
    return products[0].toJSON() as ProductResponseDto;
  }
  return null;
};

/**
 * Elimina un producto de la base de datos.
 *
 * @param id - Identificador único del producto.
 * @returns {Promise<boolean>} - true si fue eliminado, false si no existe.
 */
export const deleteProduct = async (id_product: number): Promise<boolean> => {
  const rows = await Product.destroy({ where: { id_product } });
  return rows > 0;
};
