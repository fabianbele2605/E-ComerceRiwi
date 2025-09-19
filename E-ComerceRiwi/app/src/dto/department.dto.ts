// app/src/dto/department.dto.ts

/**
 * Department DTO
 * ---------------
 * This file defines the Data Transfer Objects (DTO) related to the `Department` entity.
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for department creation.
 *
 * @property {string} name - Unique name of the department.
 * @property {boolean} [is_active] - Whether the department is active (optional, defaults to true).
 *
 * @example
 * const dto: CreateDepartmentDto = {
 *   name: "Recursos Humanos",
 *   is_active: true
 * };
 */
export interface CreateDepartmentDto {
  name: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object for updating departments.
 *
 * @property {string} [name] - Department name.
 * @property {boolean} [is_active] - Whether the department is active.
 * 
 * @example
 * const dto: UpdateDepartmentDto = {
 *   name: "Finanzas",
 *   is_active: false
 * };
 */
export interface UpdateDepartmentDto {
  name?: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of a department.
 *
 * @property {number} id_department - Unique identifier of the department.
 * @property {string} name - Department name.
 * @property {boolean} is_active - Whether the department is active.
 * @property {Date} createdAt - Timestamp of when the department was created.
 * @property {Date} updatedAt - Timestamp of when the department was last updated.
 * 
 * @example
 * const department: DepartmentResponseDto = {
 *   id_department: 1,
 *   name: "Sistemas",
 *   is_active: true,
 *   createdAt: 18/06/2024,
 *   updatedAt: 18/06/2025
 * };
 */
export interface DepartmentResponseDto {
  id_department: number;
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
