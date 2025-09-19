// app/src/dto/city.dto.ts

/**
 * city DTO
 * ---------
 * This file defines the Data Transfer Objects (DTO) related to the `User` entity.
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for city creation.
 *
 * @property {string} name - Unique name of the city.
 * @property {boolean} [is_active] - Whether the city is active (optional, defaults to true).
 *
 * @example
 * const dto: CreateCityDto = {
 *   name: "Bogotá",
 *   is_active: true
 * };
 */
export interface CreateCityDto {
  name: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object for updating cities.
 *
 * @property {string} [name] - City name.
 * @property {boolean} [is_active] - Whether the city is active.
 * 
 * @example
 * const dto: UpdateCityDto = {
 *   name: "Barranquilla",
 *   is_active: false
 * };
 */
export interface UpdateCityDto {
  name?: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of a city.
 *
 * @property {number} id_city - Unique identifier of the city.
 * @property {string} name - City name.
 * @property {boolean} is_active - Whether the city is active.
 * @property {Date} createdAt - Timestamp of when the city was created.
 * @property {Date} updatedAt - Timestamp of when the city was last updated.
 * 
 * @example
 * const city: CityResponseDto = {
 *   id_city: 1,
 *   name: "Medellín",
 *   is_active: true,
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 */

export interface CityResponseDto {
  id_city: number;
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}