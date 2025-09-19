// app/src/dto/addresses.dto.ts

/**
 * Addresses DTO
 * -------------
 * This file defines the Data Transfer Objects (DTO) related to the addresses entity.
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for creating an address.
 *
 * @property {number} user_id - Identifier of the user associated with the address.
 * @property {number} city_id - Identifier of the city associated with the address.
 * @property {number} departament_id - Identifier of the departament associated with the address.
 * @property {number} country_id - Identifier of the country associated with the address.
 * @property {string} street - Street name and number.
 * @property {string} number - Street indentificators
 * @property {string} postal_code - Postal code of the address.
 * @property {boolean} is_active - Whether the access is active (optional, defaults to true) or not.
 * 
 * @example
 * const dto: CreateAddressesDto = {
 *   user_id: 1,
 *   city_id: 4e6t1,
 *   departament_id: 45691e;
 *   country_id: 5mc;
 *   street: "Main St",
 *   number: "953-2"
 *   postal_code: "10001",
 *   is_active: true
 * };
 */
export interface CreateAddressesDto {
  user_id: number;
  city_id: number;
  department_id: number;
  country_id: number;
  street: string;
  number: string;
  postal_code: string; 
  is_active: boolean;
}

/**
 * Data Transfer Object for updating an address.
 *
 * @property {number} [user_id] - Identifier of the user associated with the address.
 * @property {number} [city_id] - Identifier of the city associated with the address.
 * @property {number} [departament_id] - Identifier of the departament associated with the address.
 * @property {number} [country_id] - Identifier of the country associated with the address.
 * @property {string} [street] - Street name and number.
 * @property {string} [number] - Street indentificators
 * @property {string} [postal_code] - Postal code of the address.
 * @property {boolean} [is_active] - Whether the access is active (optional, defaults to true) or not.
 *
 * @example
 * const dto: UpdateAddressesDto = {
 *   city: "Los Angeles",
 *   is_primary: false
 * };
 */
export interface UpdateAddressesDto {
    user_id?: number;
    city_id?: number;
    department_id?: number;
    country_id?: number;
    street?: string;
    number?: string;
    postal_code?: string; 
    is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of an address.
 *
 * @property {number} id_address - Unique identifier of the address.
 * @property {number} user_id - Identifier of the user associated with the address.
 * @property {string} street - Street name and number.
 * @property {string} city - City where the address is located.
 * @property {string} state - State/region of the address.
 * @property {string} postal_code - Postal code of the address.
 * @property {string} country - Country of the address.
 * @property {boolean} is_primary - Whether this is the primary address.
 * @property {Date} createdAt - Timestamp when the address was created.
 * @property {Date} updatedAt - Timestamp when the address was last updated.
 *
 * @example
 * const address: AddressesResponseDto = {
 *   id_address: 5,
 *   user_id: 1,
 *   street: "123 Main St",
 *   city: "New York",
 *   state: "NY",
 *   postal_code: "10001",
 *   country: "USA",
 *   is_primary: true,
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 */
export interface AddressesResponseDto {
  user_id: number;
  city_id: number;
  departament_id: number;
  country_id: number;
  street: string;
  number: string;
  postal_code: string; 
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}