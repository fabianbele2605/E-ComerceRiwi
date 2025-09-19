// app/src/dto/role.dto.ts

/**
 * Role DTO
 * ---------
 * This file defines the Data Transfer Objects (DTO) related to the `Role` entity.
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for role creation.
 *
 * @property {string} name - Unique name of the role.
 * @property {boolean} [is_active] - Whether the role is active (optional, defaults to true).
 *
 * @example
 * const dto: CreateRoleDto = {
 *   name: "Admin",
 *   is_active: true
 * };
 */
export interface CreateRoleDto {
  name: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object for updating roles.
 *
 * @property {string} [name] - Role name.
 * @property {boolean} [is_active] - Whether the role is active.
 * 
 * @example
 * const dto: UpdateRoleDto = {
 *   name: "Visitor",
 *   is_active: false
 * };
 */
export interface UpdateRoleDto {
  name?: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of a role.
 *
 * @property {number} id_role - Unique identifier of the role.
 * @property {string} name - Role name.
 * @property {boolean} is_active - Whether the role is active.
 * @property {Date} createdAt - Timestamp of when the role was created.
 * @property {Date} updatedAt - Timestamp of when the role was last updated.
 * 
 * @example
 * const role: RoleResponseDto = {
 *   id_role: 1,
 *   name: "Manager",
 *   is_active: true,
 *   createdAt: 18/06/2024,
 *   updatedAt: 18/06/2025
 * };
 */
export interface RoleResponseDto {
  id_role: number;
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
