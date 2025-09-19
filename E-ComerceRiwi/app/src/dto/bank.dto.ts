// app/src/dto/bank.dto.ts

/**
 * Bank DTO
 * ---------------
 * This file defines the Data Transfer Objects (DTO) related to the `Bank` entity.
 * 
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for bank creation.
 *
 * @property {string} name - Unique name of the bank.
 * @property {boolean} [is_active] - Whether the bank is active (optional, defaults to true).
 *
 * @example
 * const dto: CreateBankDto = {
 *   name: "Bancolombia",
 *   is_active: true
 * };
 */
export interface CreateBankDto {
  name: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object for updating banks.
 *
 * @property {string} [name] - Bank name.
 * @property {boolean} [is_active] - Whether the bank is active.
 * 
 * @example
 * const dto: UpdateBankDto = {
 *   name: "Davivienda",
 *   is_active: false
 * };
 */
export interface UpdateBankDto {
  name?: string;
  is_active?: boolean;
}

/**
 * Data Transfer Object that represents the response of a bank.
 *
 * @property {number} id_bank - Unique identifier of the bank.
 * @property {string} name - Bank name.
 * @property {boolean} is_active - Whether the bank is active.
 * @property {Date} createdAt - Timestamp of when the bank was created.
 * @property {Date} updatedAt - Timestamp of when the bank was last updated.
 * 
 * @example
 * const bank: BankResponseDto = {
 *   id_bank: 1,
 *   name: "Banco de Bogotá",
 *   is_active: true,
 *   createdAt: 2024-06-18,
 *   updatedAt: 2025-06-18
 * };
 */
export interface BankResponseDto {
  id_bank: number;
  name: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
