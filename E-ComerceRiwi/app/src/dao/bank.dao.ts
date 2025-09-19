// app/src/dao/bank.dao.ts

/**
 * Bank DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the `banks` entity.
 * 
 * The DAO (Data Access Object) pattern encapsulates the database access logic,
 * separating it from controllers and ensuring better code organization.
 *
 * Defined functions:
 *  - createBank: Inserts a new bank into the database.
 *  - getBanksActive: Retrieves all active banks.
 *  - getBanks: Retrieves all banks.
 *  - getBankByIdActive: Retrieves an active bank by ID.
 *  - getBankById: Retrieves a bank by ID.
 *  - updateBank: Updates an existing bank.
 *  - softDeleteBank: Marks a bank as inactive (soft delete).
 */

import Bank from "../models/bank.model";
import { CreateBankDto, UpdateBankDto, BankResponseDto } from "../dto/bank.dto";

/**
 * Inserts a new bank into the database.
 *
 * @param data - Data required to create the bank (CreateBankDto).
 * @returns {Promise<BankResponseDto>} - The created bank.
 */
export const createBank = async (data: CreateBankDto): Promise<BankResponseDto> => {
  const bank = await Bank.create({
    name: data.name,
    is_active: data.is_active ?? true, // default if not provided
  });

  return bank.toJSON() as BankResponseDto;
};

/**
 * Retrieves all active banks from the `banks` table.
 *
 * @returns {Promise<BankResponseDto[]>} - List of active banks.
 */
export const getBanksActive = async (): Promise<BankResponseDto[]> => {
  const banks = await Bank.findAll({ where: { is_active: true } });
  return banks.map((b) => b.toJSON() as BankResponseDto);
};

/**
 * Retrieves all banks from the `banks` table.
 *
 * @returns {Promise<BankResponseDto[]>} - List of banks.
 */
export const getBanks = async (): Promise<BankResponseDto[]> => {
  const banks = await Bank.findAll();
  return banks.map((b) => b.toJSON() as BankResponseDto);
};

/**
 * Retrieves an active bank by ID.
 *
 * @param id_bank - Unique bank identifier.
 * @returns {Promise<BankResponseDto | null>} - Found bank or null.
 */
export const getBankByIdActive = async (id_bank: number): Promise<BankResponseDto | null> => {
  const bank = await Bank.findOne({ where: { id_bank, is_active: true } });
  return bank ? (bank.toJSON() as BankResponseDto) : null;
};

/**
 * Retrieves a bank by ID.
 *
 * @param id_bank - Unique bank identifier.
 * @returns {Promise<BankResponseDto | null>} - Found bank or null.
 */
export const getBankById = async (id_bank: number): Promise<BankResponseDto | null> => {
  const bank = await Bank.findByPk(id_bank);
  return bank ? (bank.toJSON() as BankResponseDto) : null;
};

/**
 * Updates an existing bank.
 *
 * @param id_bank - Bank identifier to update.
 * @param data - Data to update (UpdateBankDto).
 * @returns {Promise<BankResponseDto | null>} - Updated bank or null if not found.
 */
export const updateBank = async (id_bank: number, data: UpdateBankDto): Promise<BankResponseDto | null> => {
  const [rows, banks] = await Bank.update(data, {
    where: { id_bank },
    returning: true,
  });

  if (rows > 0 && banks.length > 0) {
    const updatedBank = banks[0].toJSON() as BankResponseDto;
    return updatedBank;
  }
  return null;
};

/**
 * Marks a bank as inactive (soft delete).
 *
 * @param id_bank - Bank identifier.
 * @returns {Promise<boolean>} - true if the bank was updated, false if not found.
 */
export const softDeleteBank = async (id_bank: number): Promise<boolean> => {
  const [rows] = await Bank.update(
    { is_active: false },
    { where: { id_bank } }
  );

  return rows > 0;
};
