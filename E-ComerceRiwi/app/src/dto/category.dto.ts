// app/src/dto/category.dto.ts
//
/**
 * DTO de Usuario
 * ---------------
 * Este archivo define los Data Transfer Objects (DTO) relacionados con la entidad `categories`.
 * 
 * Los DTO se utilizan para:
 *  - Estandarizar los datos que se reciben o envían a través de la API.
 *  - Validar y tipar los objetos que entran a los controladores.
 *  - Evitar exponer directamente los modelos de la base de datos.
 */


/**         
 * Objeto de transferencia de datos para la creación de categoria.
 *
 * @property {string} name - Nombre de la categoria.
 * @property {boolean} is_active - Estado de la categoria.
 *
 * @example
 * const dto: CreateCategoryDto = {
 *  name: "Consolas",
 *  is_active: true,
 * };
 */

export interface CreateCategoryDto {
    name: string;
    is_active: boolean;
}


/**         
 * Objeto de transferencia de datos para editar la categoria.
 *
 * @property {string} [name] - Nombre de la categoria.
 * @property {boolean} [is_active] - Estado de la categoria.
 *
 * @example
 * const dto: UpdateCategoryDto = {
 *  name: "Consolas",
 *  is_active: true,
 * };
 */

export interface UpdateCategoryDto {
    name?: string;
    is_active?: boolean;
}


/**         
 * Objeto de transferencia de datos para la respuesta de una categoria.
 *
 * @property {number} id - Identificador unico de la categoria.
 * @property {string} name - Nombre de la categoria.
 * @property {boolean} is_active - Estado de la categoria.
 *
 * @example
 * const dto: CategoryResponseDto = {
 *  id: 1,
 *  name: "Consolas",
 *  is_active: true,
 * };
 */

export interface CategoryResponseDto {
    id: number;
    name: string;
    is_active: boolean;
}