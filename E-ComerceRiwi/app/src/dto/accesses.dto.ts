// app/src/dto/accesses.dto.ts

/**
 * Accesses DTO
 * ------------
 * This file defines the Data Transfer Objects (DTO) related to the accesses entity.
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for creating an access record.
 * @property {number} role_id - id to identify the rol
 * @property {string} username - Username for login.
 * @property {string} password - Password (should be hashed before storing).
 * @property {boolean} [is_active] - Whether the access is active (optional, defaults to true).
 *
 * @example
 * const dto: CreateAccessesDto = {
 *   username: "admin",
 *   password: "hashedPassword123",
 *   is_active: true
 * };
 */
export interface CreateAccessesDto {
    role_id: number;
    username: string;
    password: string;
    is_active: boolean;
}

/**
 * Data Transfer Object for updating an access record.
 *
 * @property {string} [username] - Updated username.
 * @property {string} [password] - Updated password (hashed).
 * @property {boolean} [is_active] - Whether the access is active.
 *
 * @example
 * const dto: UpdateAccessesDto = {
 *   password: "newHashedPassword",
 *   is_active: false
 * };
 */
export interface UpdateAccessesDto {
    role_id?: number;
    username?: string;   
    password?: string;
    is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of an access record.
 *
 * @property {number} id_access - Unique identifier of the access record.
 * @property {string} username - Username for login.
 * @property {boolean} is_active - Whether the access is active.
 * @property {Date} createdAt - Timestamp when the record was created.
 * @property {Date} updatedAt - Timestamp when the record was last updated.
 *
 * @example
 * const access: AccessesResponseDto = {
 *   id_access: 1,
 *   username: "admin",
 *   is_active: true,
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 */
export interface AccessesResponseDto {
  id_access: number;
  username: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}