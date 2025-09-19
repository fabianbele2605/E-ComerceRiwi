// app/src/dto/country.dto.ts

/**
 * Country DTO
 * ------------
 * This file defines the Data Transfer Objects (DTO) related to the `Country` entity.
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for country creation.
 *
 * @property {string} name - Unique name of the country.
 * @property {boolean} [is_active] - Whether the country is active (optional, defaults to true).
 *
 * @example
 * const dto: CreateCountryDto = {
 *   name: "Colombia",
 *   is_active: true
 * };
 */
export interface CreateCountryDto {
  name: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object for updating countries.
 *
 * @property {string} [name] - Country name.
 * @property {boolean} [is_active] - Whether the country is active.
 * 
 * @example
 * const dto: UpdateCountryDto = {
 *   name: "Argentina",
 *   is_active: false
 * };
 */
export interface UpdateCountryDto {
  name?: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of a country.
 *
 * @property {number} id_country - Unique identifier of the country.
 * @property {string} name - Country name.
 * @property {boolean} is_active - Whether the country is active.
 * @property {Date} createdAt - Timestamp of when the country was created.
 * @property {Date} updatedAt - Timestamp of when the country was last updated.
 * 
 * @example
 * const country: CountryResponseDto = {
 *   id_country: 1,
 *   name: "México",
 *   is_active: true,
 *   createdAt: 18/06/2024,
 *   updatedAt: 18/06/2025
 * };
 */
export interface CountryResponseDto {
  id_country: number;
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
