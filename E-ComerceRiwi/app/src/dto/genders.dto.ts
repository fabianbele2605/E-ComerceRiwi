// app/src/dto/gender.dto.ts

/**
 * Gender DTO
 * ----------
 * This file defines the Data Transfer Objects (DTO) related to the genders entity.
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for creating a gender.
 *
 * @property {string} name - Name of the gender.
 * @property {boolean} is_active - Whether the access is active (optional, defaults to true) or not.
 *
 * @example
 * const dto: CreateGenderDto = {
 *   name: "Male"
 *   is_active: true
 * };
 */
export interface CreateGenderDto {
    name: string;
    is_active: boolean;
}

/**
 * Data Transfer Object for updating a gender.
 *
 * @property {string} [name] - Updated name of the gender.
 * @property {boolean} [is_active] - Whether the access is active (optional, defaults to true) or not.
 * 
 * @example
 * const dto: UpdateGenderDto = {
 *      name: "Non-binary"
 *      is_active: true
 * };
 */
export interface UpdateGenderDto {
    name?: string;
    is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of a gender.
 *
 * @property {string} name - Name of the gender.
 * @property {boolean} is_active - Whether the access is active (optional, defaults to true) or not.
 * @property {Date} createdAt - Timestamp when the gender was created.
 * @property {Date} updatedAt - Timestamp when the gender was last updated.
 *
 * @example
 * const gender: GenderResponseDto = {
 *   id_gender: 1,
 *   name: "Female",
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 */
export interface GenderResponseDto {
    name: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}